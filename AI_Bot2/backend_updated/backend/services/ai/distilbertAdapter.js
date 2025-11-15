// services/ai/distilbertAdapter.js
const axios = require('axios');
const HF_API_KEY = process.env.HF_API_KEY;

// Convert text into vector embeddings
async function getEmbedding(text) {
  if (!HF_API_KEY) {
    console.warn('⚠️ No HuggingFace API key found. Returning random vector for testing.');
    return Array.from({ length: 768 }).map(() => Math.random());
  }

  const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/distilbert-base-uncased';
  const response = await axios.post(
    url,
    { inputs: text },
    { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
  );

  // Average all token vectors
  const tokens = response.data;
  const dim = tokens[0].length;
  const avg = new Array(dim).fill(0);

  tokens.forEach(token => {
    for (let i = 0; i < dim; i++) avg[i] += token[i];
  });
  for (let i = 0; i < dim; i++) avg[i] /= tokens.length;

  return avg;
}

// Cosine similarity between two vectors
function cosine(a, b) {
  let dot = 0, ma = 0, mb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    ma += a[i] * a[i];
    mb += b[i] * b[i];
  }
  return dot / (Math.sqrt(ma) * Math.sqrt(mb) + 1e-10);
}

module.exports = { getEmbedding, cosine };
