import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama"
import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector"

// ✅ Neo4j Configuration
const config = {
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USER,
  password: process.env.NEO4J_PASSWORD,
  textNodeProperties: ["text"],
  indexName: "javascript_index",
  keywordIndexName: "javascript_keywords",
  searchType: "vector",
  nodeLabel: "Chunk",
  textNodeProperty: "text",
  embeddingNodeProperty: "embedding"
}

// ✅ Initialize Language Model
const model = new ChatOllama({
  temperature: 0,
  maxRetries: 2,
  model: process.env.NLP_MODEL,
  baseURL: process.env.OLLAMA_BASE_URL
})

// ✅ Initialize Embeddings Model
const ollamaEmbeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseURL: process.env.OLLAMA_BASE_URL
})

const neo4jVectorIndex = await Neo4jVectorStore.fromExistingGraph(
  ollamaEmbeddings,
  config
)

export { model, neo4jVectorIndex }
