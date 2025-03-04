import { readFile } from "node:fs/promises"
import { neo4jVectorIndex } from "./setup.js"

// ✅ Load and Process JavaScript Documentation
const documents = (await readFile("./data/javascript.txt", "utf-8"))
  .toString()
  .split(".")
  .map((sentence) => ({
    pageContent: sentence.trim(),
    metadata: {}
  }))
  .filter((doc) => doc.pageContent.length > 10) // Avoid empty or too-short documents

// ✅ Function to Check and Store Documents with Embeddings
async function addDocumentIfNotExists(doc) {
  const searchResults = await neo4jVectorIndex.similaritySearch(
    doc.pageContent,
    2
  )
  // console.log("🔍 Search Results:", searchResults);
  if (
    searchResults.length > 0 &&
    searchResults[0].pageContent === "\ntext: ".concat(doc.pageContent)
  ) {
    // console.log(`🚫 Skipping duplicate: "${doc.pageContent}"`);
  } else {
    console.log(`✅ Adding new document: "${doc.pageContent}"`)
    await neo4jVectorIndex.addDocuments([doc])
  }
}

// ✅ Add Documents to Vector Store if Not Exists
export async function processDocumentation() {
  for (const doc of documents) {
    await addDocumentIfNotExists(doc)
  }
}
