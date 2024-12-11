# ToDo

- Funcionalidade de autenticação
  - Login
  - Register
    - Registro sucesso, verifique email
    - Conta verificada sucesso(ir para login)
  - Esqueceu senha(inserir email, reenviar token a cada 30s)
  - Nova senha, confirmar nova senha
  - Senha alterada com sucesso(ir para login)

## User

- Funcionalidade de Responder Questões
  - Pagina: Simulado
    - Uma pre tela para selecionar as questões por filtro
      - Tema (1)
      - Faculdade (1)
      - Ano (1)
      - Quantidade (10-25)
    - Questões no modo simulado em uma pagina só, mostrando o resultado e justificativa apenas depois de responder TODAS as questões
      <!-- *- Contador de tempo para responder tudo e ao fim mostrar o tempo -->
  - Pagina: Testes
    - Filtro integrado responder questões no modo teste uma por uma
      - Botão de confirmar resposta
      - Botão de Avançar para a proxima

- Funcionalidade de Dashboard
  - Pagina: Dashboard
- Funcionalidade de Profile
  - Pagina: Profile
- Funcionalidade de Assinar Plano
  - Pagina: Planos

## Admin

- Funcionalidade de Gerenciar Questões de Admin
  - Criar questões manualmente() ou por .PDF
  - Editar/deletar/desativar determinada questão

- Funcionalidade de Gerenciar Usuários

- Funcionalidade de Gerenciar Usuários

- Funcionalidade de Gerenciar Usuários

- Funcionalidade de Gerenciar Questões Reportadas
  - Pagina de Questões Reportadas
  - Pagina de Questão Reportada  

- Funcionalidade de Dashboard
  - Pagina: Dashboard

{
	id
	pergunta
	options:[
		text
		isRight
	]
	justificativa
	cateria:[cirurgia, sus]
	ano
	local
}