import mysql.connector
import sys
import re
import pdfplumber
import openai
# from lib_color import printf
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.environ.get("GPT_API_KEY")

if not api_key:
    raise ValueError("A chave de API 'GPT_API_KEY' não foi encontrada no ambiente.")
openai.api_key = api_key

def get_available_parent_categories(cursor):
    cursor.execute(f'SELECT id, categoryName FROM categories WHERE parentId IS NULL;')
    return cursor.fetchall()

def get_available_child_categories(cursor, id):
	cursor.execute(f'SELECT id, categoryName FROM categories WHERE parentId = %s;', (_id,))
	return cursor.fetchall()

def send_to_gpt(messages):
    return openai.ChatCompletion.create(
        # model="gpt-4",
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0
    )
  
def get_justification_and_parent_category(question, option_right, categories):
		"""
		Analisa uma questão para determinar sua categoria principal e fornece uma justificativa.

		:param question: Texto da questão a ser analisada.
		:param option_right: Letra da alternativa correta.
		:param categories: Lista de categorias disponíveis.
		:return: ID da categoria e justificativa.
		"""

		messages = [
				{"role": "system", "content": "Você é um assistente especializado em análise de questões."},
				{"role": "user", "content": f"""
		Analise a seguinte questão e responda:
		- Categoria: Qual das seguintes categorias a questão pertence (retorne apenas o id da categoria): 
		{categories}
		- Justificativa: Dê uma explicação curta e objetiva para a resposta correta SEM citar a alternativa certa.

		Questão:
		{question}
		Resposta correta: Letra {option_right}"""}
		]

		try:
				response = send_to_gpt(messages)

				text_response = response['choices'][0]['message']['content'].strip()
				lines = text_response.split('\n')

				match = re.search(r'(\d+)', lines[0].replace("Categoria:", "").strip())
				parent_category = match.group(1) if match else "Indefinido"

				justification = (
						lines[1].replace("Justificativa:", "").strip()
						if len(lines) > 1 else "Sem justificativa"
				)

				justification = re.sub(r'justificativa:','',justification).strip().capitalize()
				if justification.startswith("-"):
						justification = justification[1:].strip().capitalize()
				if justification.startswith("justificativa:"):
						justification = justification[13:].strip().capitalize()
				return parent_category, justification
		except KeyError as e:
				print(f"Erro: Chave ausente na resposta do GPT ({e}).")
		except IndexError as e:
				print(f"Erro: Índice fora do intervalo ao processar a resposta do GPT ({e}).")
		except AttributeError as e:
				print(f"Erro: Resposta inesperada do GPT ({e}).")
		except Exception as e:
				print(f"Erro inesperado ao processar a resposta do GPT: {e}")

		# Retorna valores padrão em caso de erro
		return "Indefinido", "Sem justificativa"

def get_child_category(question, option_right, categories, pre_categories):
    """
    Obtém a subcategoria (child category) da questão analisando o contexto fornecido.
    
    :param question: A questão a ser analisada.
    :param option_right: A alternativa correta da questão.
    :param categories: Lista de IDs das categorias disponíveis.
    :param pre_categories: Lista de categorias "pai" (contexto).
    :return: ID da categoria correspondente ou "Indefinido".
    """
    # Define a mensagem para o GPT
    messages = [
        {"role": "system", "content": "Você é um assistente especializado em análise de questões."},
        {"role": "user", "content": f"""
Sabendo que a próxima questão está dentro do contexto: {' > '.join(map(str, pre_categories))}.
Analise a seguinte questão e determine:
- Qual das seguintes categorias a questão pertence (retorne APENAS o id da categoria): 
    {categories}

Questão:
{question}
Resposta correta: Letra {option_right}
        """}
    ]

    try:
        # Envia a mensagem para o GPT
        response = send_to_gpt(messages)

        # Garante que a resposta esteja estruturada corretamente
        text_response = response['choices'][0]['message']['content'].strip()
        lines = text_response.split('\n')

        # Inicializa o valor padrão para categoria
        child_category = "Indefinido"

        # Processa a categoria
        if len(lines) > 0:
            match = re.search(r'(\d+)', lines[0].replace("Categoria:", "").strip())
            if match:
                child_category = match.group(1)

        return child_category

    except KeyError as e:
        print(f"Erro: Chave ausente na resposta do GPT ({e}).")
    except IndexError as e:
        print(f"Erro: Índice fora do intervalo ao processar a resposta do GPT ({e}).")
    except AttributeError as e:
        print(f"Erro: Resposta inesperada do GPT ({e}).")
    except Exception as e:
        print(f"Erro inesperado ao processar a resposta do GPT: {e}")

    # Retorna valor padrão em caso de erro
    return "Indefinido"
def format_categories_from_query(result):
		final_string = ''
		for item in result:
				final_string += (': '.join(map(str, item))+'; ')
		return final_string

def analyze_question_with_gpt(question, option_right, cursor):
    """
    Analisa uma questão usando o GPT para determinar sua categoria final e justificativa.

    :param question: Texto da questão a ser analisada.
    :param option_right: Alternativa correta da questão.
    :param cursor: Cursor do banco de dados para realizar consultas.
    :return: ID da categoria final e justificativa da resposta.
    """
    try:
        # Obter categorias principais
        parent_categories = get_available_parent_categories(cursor)
        categories_str = format_categories_from_query(parent_categories)

        # Obter a categoria principal e justificativa
        parent_category, justification = get_justification_and_parent_category(
            question, option_right, categories_str
        )

        # Lista para rastrear a hierarquia
        pre_categories = []
        final_categoryId = parent_category

        while True:
            # Obter categorias filhas da categoria atual
            child_categories = get_available_child_categories(cursor, parent_category)
            if not child_categories:
                break

            # Obter o nome da categoria principal para contexto
            cursor.execute(
                f"SELECT categoryName FROM categories WHERE id = {parent_category};"
            )
            pre_category = cursor.fetchone()  # fetchone() usado para obter uma linha
            if pre_category:
                pre_categories.append(pre_category[0])  # Nome da categoria

            # Formatar categorias filhas e buscar nova categoria
            categories_str = format_categories_from_query(child_categories)
            next_categoryId = get_child_category(
                question, option_right, categories_str, pre_categories
            )

            # Verificar se a nova categoria é válida
            if next_categoryId == "Indefinido" or next_categoryId == parent_category:
                break

            # Atualizar a categoria principal para a próxima iteração
            parent_category = next_categoryId
            final_categoryId = next_categoryId

        return final_categoryId, justification

    except Exception as e:
        print(f"Erro ao analisar questão: {e}")
        return "Indefinido", "Erro ao processar a justificativa"

def get_or_create_college(db, cursor, collegeName, acronym):
    cursor.execute("SELECT id FROM colleges WHERE name = %s AND acronym = %s", (collegeName, acronym))
    college = cursor.fetchone()
    
    if college:
        return college[0]
    else:
        sql = "INSERT INTO colleges (name, acronym) VALUES (%s, %s)"
        cursor.execute(sql, (collegeName, acronym))
        db.commit()
        return cursor.lastrowid 

def insert_question(db, cursor, collegeId, categoryId, question, justification, year):
		if categoryId == 'Indefinido':
				categoryId = 'NULL'
		sql = """
		INSERT INTO questions (collegeId, categoryId, question, justification, year)
		VALUES (%s, %s, %s, %s, %s)
		"""
		cursor.execute(sql, (collegeId, categoryId, question, justification, year))
		db.commit()
		return cursor.lastrowid

def insert_option(cursor, questionId, optionText, isRight):
    sql = "INSERT INTO options (questionId, optionText, isRight) VALUES (%s, %s, %s)"
    cursor.execute(sql, (questionId, optionText, isRight))
    

def process_pdf(db, pdf_path, cursor):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        text = re.sub(r'(\d{2}\/\d{2}\/\d{4}|\nhttp).*?(Prova|$)', '', text)

        match_header = re.search(r"([A-Z\sÉÇÃÕÍÚÔ]+) - (\w{2,}) (\d{4})", text)
        text = re.sub(r"([A-Z\sÉÇÃÕÍÚÔ]+) - (\w{2,}) (\d{4})",'', text)
        
        if match_header:
            collegeName = match_header.group(1).strip() or 'Faculdade Desconhecida'
            acronym = match_header.group(2).strip() or 'N/A'
            year = match_header.group(3).strip() or '0000'
        else:
            collegeName = "Faculdade Desconhecida"
            acronym = "N/A"
            year = "0000"

        collegeId = get_or_create_college(db, cursor, collegeName, acronym)
        questions = re.findall(r'\d+\)\s(.*?)(?=\d+\)\s[A-ZÉ]|1\s[A-E])', text, re.DOTALL)
        gabarito = re.findall(r"\d+\s([A-E!])", text[-550:])
        
        if len(questions) != len(gabarito):
          raise ValueError(f"Inconsistência: {len(questions)} questões encontradas, mas {len(gabarito)} respostas no gabarito.")

        for i, question in enumerate(questions):
          question = re.sub(r'\n', ' ', question, re.DOTALL)
          question_no_options = re.sub(r'\s[A-E]\) .*', '', question, re.DOTALL)
          sql = "SELECT * FROM questions WHERE question = %s"
          cursor.execute(sql, (question_no_options,))
          exist_question = cursor.fetchone()
          if gabarito[i]!= '!' and exist_question is None:
            # printf(f'\tAnalyzing question {i+1} with ChatGPT', 'yellow')
            category, justification = analyze_question_with_gpt(question, gabarito[i], cursor) 
            # printf(f"Questão {i+1}: \n- Categoria: {category} \n- Justificativa: {justification}", 'blue')
            options = re.findall(r"[A-E]\)\s(.*?)(?=\s[A-E]\)|$)", question, re.DOTALL)
            questionId = insert_question(db, cursor, collegeId, category, question_no_options, justification, year)
            
            for ii, option in enumerate(options):
                option = re.sub(r'\n',' ', option)
                option = options[ii][0].capitalize() + options[ii][1:]
                isRight = gabarito[i] == chr(65 + ii)
                insert_option(cursor, questionId, option, isRight)
            db.commit() 
          # else:
            # printf(f'Questão {i+1} '+('foi anulada.' if gabarito[i]== '!' else 'já existe no banco de dados') , 'red')
        db.commit() 

if __name__ == '__main__':
		db = mysql.connector.connect(
		host="auth-db1782.hstgr.io",
		user="u723563648_medformeds",
		password="Host4862",
		database="u723563648_medfy"    
		)
		with db.cursor() as cursor:
			pdf_path = sys.argv[1]
			process_pdf(db,f'./server/uploads/PDFs/{pdf_path}', cursor)
		db.close()
    