# 📝 API TODO List

API REST de gerenciamento de tarefas com autenticação de usuários, desenvolvida como desafio técnico. Permite aos usuários autenticados criar, listar, atualizar e excluir tarefas.

---

## 🚀 Tecnologia Escolhida

A tecnologia utilizada foi o **Express.js**, um framework minimalista e amplamente adotado para construção de APIs com Node.js.

> 💡 **Por que Express.js?**  
> Por ser leve, direto ao ponto e ideal para projetos com prazos curtos. Já possuo familiaridade com o Express, o que me permitiu focar na arquitetura e organização do projeto, aplicando boas práticas como separação de responsabilidades e documentação via Swagger. Em projetos maiores, ferramentas como **NestJS** seriam interessantes por sua estrutura robusta, mas o Express foi mais apropriado neste contexto.

## ⚙️ Setup do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Wladison-Maciel/Teste-Tecnico
   cd seu-diretorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   ```.env
   DB_HOST=localhost
   DB_USERNAME=postgres
   DB_PASSWORD=[Senha do PostgreSQL]
   DB_DATABASE=[Nome do Database]
   DB_DIALECT=postgres
   APP_SECRET=[Crie uma senha para assinatura]
   ```

4. Inicialize as migrations:
```bash
   npm run migrate
   ```

## ▶️ Como Executar

1. Execute o projeto com o comando:
```bash
npm run dev
```

A aplicação estará disponível em http://localhost:3000.

2. Acesse a documentação Swagger em:
```bash
http://localhost:3000/api-docs
```

## 🧪 Como Testar
Você pode testar todas as rotas utilizando o Insomnia (ou Postman).
Importe o arquivo de collection que está na pasta:

```bash
src/insomniaCollection/insomnia_API_TodoList
```

## 🧱 Arquitetura do Projeto

```
src
├── config/
├── controllers/
├── database/
├── docs/
├── insomniaCollection/
├── middlewares/
├── models/
├── routes/
├── services/
├── test/
├── validations/
├── app.js
└── index.js

```

## 🧠 Decisões Técnicas:

- **Express.js:** por sua leveza e simplicidade, ideal para projetos pequenos e testes técnicos.

- **Arquitetura em camadas (MVC):** separação clara entre rotas, controllers, services e models.

- **Validação com Zod:** para garantir dados consistentes tanto na criação quanto na atualização.

- **JWT para autenticação:** tokens seguros para proteger as rotas de tarefas.

- **Swagger:** documentação clara e acessível da API.

- **PostgreSQL + Sequelize:** banco de dados que pode ser usado tanto em aplicações pequenas quanto grandes e 
fácil de configurar para ambiente local, já o ORM tem bastante suporte para a utilização conjunta com Postgres



## 🚧 Melhorias Futuras

Se tivesse mais tempo, eu implementaria:

✅ Utilização de POO para melhor organização e estrutura do código.

✅ Testes automatizados com Jest ou Vitest.

✅ Controle de paginação e filtros na listagem de tarefas.

✅ Reenvio de token e refresh tokens para sessões mais seguras.

✅ Deploy da API com banco PostgreSQL e autenticação OAuth2.

✅ Reescrever a aplicação em TS pensando em escalabilidade e código consistente.