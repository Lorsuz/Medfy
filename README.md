# O Que Guardar em Cada Pasta dentro do SRC

- /config: Arquivos de configuração e variáveis de ambiente, incluindo conexões de banco de dados e configurações de autenticação.
- /controllers: Funções para lidar com as requisições e chamadas às lógicas de serviço.
- /middlewares: Lógica de middleware, como autenticação, autorização e tratamento de erros.
- /services: Implementação da lógica de negócio, como manipulação de dados ou integrações com APIs externas.
- /models: Estrutura de dados do banco, tipicamente com ORM (ex.: Sequelize, Mongoose).
- /validators: Validações customizadas que garantem a integridade dos dados (ex.: uso de bibliotecas como Joi, Zod).
- /schemas: Esquemas de dados, como definições de banco de dados, mas também modelos de resposta e requisição.
- /helpers: Funções auxiliares que são pequenas e reutilizáveis (ex.: funções de verificação de formato).
- /utils: Outras funções utilitárias como formatadores de data, manipuladores de strings, etc.
- /types: Apenas para TypeScript, onde definem-se interfaces e tipos do projeto.
- /lib: Módulos de terceiros e bibliotecas específicas que precisem de customização.
- /core: Configuração e lógica central, como inicialização de banco de dados e loggers.
- /common: Constantes e funções amplamente usadas, mas que não precisam estar em - /utils.
- /exports: Arquivos que agregam todos os módulos para exportação, facilitando importações no código.

## Exemplo

```cmd
/src
 │   ├── /config          # Configurações e variáveis de ambiente
 │   ├── /controllers     # Controladores para gerenciar rotas e lógica de requisição
 │   ├── /middlewares     # Middlewares (ex.: autenticação, log de erros)
 │   ├── /services        # Serviços para lógica de negócios e integrações externas
 │   ├── /models          # Modelos do banco de dados (schemas e validação de dados)
 │   ├── /validators      # Esquemas de validação e lógica de validação de dados (ex.: usando Joi ou Zod)
 │   ├── /schemas         # Estrutura de dados e esquemas do banco de dados (com ORM/ODM)
 │   ├── /helpers         # Funções auxiliares e utilitários que não dependem de lógica de negócio
 │   ├── /utils           # Utilitários gerais (ex.: formatadores, manipuladores de data/hora)
 │   ├── /types           # Definições de tipos para TypeScript (se estiver usando)
 │   ├── /lib             # Bibliotecas específicas ou código de terceiros (se necessário)
 │   ├── /core            # Funções e classes centrais (inicialização do app, logger central)
 │   ├── /common          # Constantes, enums e funções de uso comum entre módulos
 │   └── /exports         # Exposição de módulos para facilitar a importação (indexação dos módulos)
```
