import { model, neo4jVectorIndex } from "./setup.js"
import { processDocumentation } from "./processDoc.js"

/* ⏳ Process Documentation
  Load and process documentation to Neo4J.
*/
await processDocumentation()

// ✅ Function to Answer Questions Based on Stored Context
async function answerQuestion(question) {
  // console.log(`🔍 Processing question: "${question}"`);

  // 2️⃣ Search for Most Relevant Chunks in Neo4j
  const results = await neo4jVectorIndex.similaritySearchWithScore(question, 2)

  const relevantChunks = results
    .map((result) => result[0]?.pageContent?.replaceAll("text: ", ""))
    .filter(Boolean)

  if (relevantChunks.length === 0) {
    console.log("⚠️ No relevant context found.")
    return "Sorry, I couldn't find enough information to answer."
  }

  //console.log("📌 Relevant chunks found:", relevantChunks)

  // 3️⃣ Construct Prompt for GPT
  const context = relevantChunks.join("\n")
  const prompt = `
        Answer the question concisely and naturally based on the following context:
        Don't use information outside of the provided context.

        Context:
        ${context}

        Question: ${question}

        Provide a direct and informative response:

    `

  // 4️⃣ Generate Response Using AI Model
  const response = await model.invoke(prompt)

  // console.log("📝 Generated Answer:", response);
  return response
}

await Promise.all(
  [
    "O Javascript é uma linguagem orientada a objeto?"
    /*     "Is JavaScript an interpreted language?",
    "Node.js and JavaScript are the same?" */
  ].map(async (question) => {
    // ✅ Ask a Question and Get an Answer
    const response = await answerQuestion(question)
    console.log("\n💡 Final Answer:\n", response.content)
    return
  })
)

// ✅ Close Neo4j Connection
await neo4jVectorIndex.close()
