# CRUD-Angular

Front-end em **Angular** do CRUD de clientes. Consome a API REST do projeto [CRUD-Java](../CRUD-Java) (Spring Boot).

## 🛠️ Tecnologias

- Angular 21 (standalone components + signals)
- TypeScript
- RxJS
- Reactive Forms
- HttpClient

## 📁 Estrutura do Projeto

```
src/app
├── core/              → Utilitários (tratamento de erros da API)
├── models/            → Interfaces (Customer, CustomerRequest, ApiError)
├── pages/
│   ├── customer-list/ → Listagem, busca e exclusão
│   └── customer-form/ → Cadastro e edição
└── services/          → CustomerService (chamadas HTTP)
```

## ✨ Funcionalidades

- Listar clientes, com busca por nome, e-mail ou telefone
- Cadastrar novo cliente
- Editar cliente existente
- Excluir cliente (com confirmação)
- Validação no formulário e exibição dos erros devolvidos pela API (e-mail duplicado, campos obrigatórios)

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 20.19+ (ou 22.12+ / 24+)
- API [CRUD-Java](../CRUD-Java) rodando em `http://localhost:8080`

### Passos

```bash
# Instale as dependências
npm install

# Suba o servidor de desenvolvimento
npm start
```

A aplicação sobe em `http://localhost:4200`.

> A porta `4200` já está liberada no CORS do back-end. Se usar outra porta, defina `CORS_ALLOWED_ORIGINS` na API.

## 🔧 Configuração da API

A URL da API fica em `src/environments/`:

- `environment.development.ts` → usada com `npm start`
- `environment.ts` → usada no build de produção (`npm run build`)

## 📋 Commits

O projeto segue o padrão **Conventional Commits** em português.
