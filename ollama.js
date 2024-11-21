const { TextEncoder, TextDecoder } = require('text-encoding')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
require('bare-fetch/global')

/**
 * Fetch embeddings from Ollama for a given text.
 * @param {string} text - The input text to vectorize.
 * @returns {Promise<Array<number>>} - The embedding vector.
 */
async function getEmbedding(text) { 
  try {
    const response = await fetch("http://localhost:11434/api/embed", {
      method: "POST",
      body: JSON.stringify({ model: "llama3.1", input: text })
    });
    const result = await response.json()
    console.log(result)

    // Assuming the response contains embeddings in JSON format
    return result.embeddings;
  } catch (error) {
    console.error("Error fetching embedding from Ollama:", error.message);
    return null;
  }
}

// Example usage
(async () => {
  const text = "LLaMA models are great for NLP tasks.";
  const embedding = await getEmbedding(text);

  if (embedding) {
    console.log("Text Embedding:", embedding);
  }
})();


/*
curl http://localhost:11434/api/embed -d '{
  "model": "all-minilm",
  "input": "LLaMA models are great for NLP tasks."
}'
*/