# ToDo

## Geral

### Funcionalidade de autenticação

- Action: Login
- Action: Register
  - Res: Registro sucesso, verifique email
  - Res: Conta verificada sucesso(ir para login)
- Action: Esqueceu senha(inserir email, reenviar token a cada 30s)
- Action: Nova senha, confirmar nova senha
  - Res: Senha alterada com sucesso(ir para login)

## User

### Funcionalidade: Responder Questões

- Page: Simulado
  - Action: Uma pre tela para selecionar as questões por filtro
    - Input: Tema (1)
    - Input: Faculdade (1)
    - Input: Ano (1)
    - Input: Quantidade (10-25)
  - Rule: Questões no modo simulado em uma page só, mostrando o resultado e justificativa apenas depois de responder TODAS as questões
    <!-- *- Contador de tempo para responder tudo e ao fim mostrar o tempo -->

- Page: Testes
  - Component: Filtro integrado responder questões no modo teste uma por uma
    - Input: Tema (1)
    - Input: Faculdade (1)
    - Input: Ano (1)
  - Component: Questão
    - number: id
    - string[]: category = `${category[0]} > ... > ${category[n]}`
    - string: year
    - string: college
    - string: question
    - {option: string, isRight: boolean}[]: option
    - Button: confirmar resposta
      - string: letter correct
      - string: justify
    - Button: Avançar para a proxima
  
### Funcionalidade Dashboard de desempenho

- Page: Dashboard
  - Total de questões resolvidas por tema
  - Gráfico de acertos, erros e total por tema

### Funcionalidade de Profile

- Page: Profile

### Funcionalidade de Assinar Plano

- Page: Planos

## Admin

### Funcionalidade de Dashboard de aplicação

- Page: Dashboard
  - Total de usuários
  - Component: gráfico de Total de questões feitas(certas, erradas)
  - Component: Gráfico de total de acessos por por dia nos últimos 7 dias
  - Component: Gráfico de assinaturas(grátis e por planos)

### Funcionalidade de Gerenciar Questões de Admin

- Page: Questões
  - Lista com previa de questões
  - Criar questões manualmente
  - Por .PDF
  - Editar/deletar/desativar determinada questão

### Funcionalidade de Gerenciar Usuários

- Page: Usuários
  - Barra de pesquisa de usuário
  - Lista de usuários w100% h200px
    - Id
    - Nome completo
    - Assinatura
    - Inicio da assinatura
    - Fim da assinatura

### Funcionalidade de Gerenciar Questões Reportadas

- Page: Questões Reportadas
  - Preview da questão em lista w100% h200px
    - id da questão
    - Quantidade de reportes
    - Previa da questão
    - Link: ver mais
- Page: Questão Reportada
  - Link: editar questão
  - Comentários da questão

### Funcionalidade de Gerenciar Planos

- Page: Planos
  - CRUD de planos
    - Nome
    - Tempo
    - Preço

req -> filtrar perguntas
res -> array de perguntas perguntas

req -> array de perguntas acertadas, acertou ou n
