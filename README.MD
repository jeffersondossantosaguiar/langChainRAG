# RAG Project with LangChain

Este projeto utiliza Retrieval-Augmented Generation (RAG) com LangChain para responder perguntas de forma inteligente utilizando modelos de linguagem e embeddings.

O mesmo foi copiado do repositório do Erick Wendel [Repo](https://github.com/ErickWendel/neo4j-ai-experiments/tree/main)

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter os seguintes requisitos instalados:

- [Ollama](https://ollama.ai/) para servir modelos de IA.
- [Docker](https://www.docker.com/) para rodar o Neo4j.
- [PNPM](https://pnpm.io/) para gerenciamento de pacotes.

## Configuração

### 1. Iniciar o servidor Ollama

```sh
ollama serve
```

### 2. Baixar os modelos necessários

```sh
ollama pull gemma:2b
ollama pull nomic-embed-text
```

### 3. Subir o banco de dados Neo4j

```sh
docker-compose up -d
```

### 4. Instalar dependências

```sh
pnpm install
```

### 5. Executar o projeto

```sh
pnpm run dev
```
