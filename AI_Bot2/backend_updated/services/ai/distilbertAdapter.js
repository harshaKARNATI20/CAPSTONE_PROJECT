// Simple placeholder distil adapter - returns random vector if no HF key
const axios = require('axios');
const HF_API_KEY = process.env.HF_API_KEY;

async function getEmbedding(text) {
  if (!HF_API_KEY) return Array.from({length: 128}).map(()=>Math.random());
  const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/distilbert-base-uncased';
  const resp = await axios.post(url, { inputs: text }, { headers: { Authorization: `Bearer ${HF_API_KEY}` } });
  const tokens = resp.data;
  const dim = tokens[0].length;
  const avg = new Array(dim).fill(0);
  tokens.forEach(t=>{ for(let i=0;i<dim;i++) avg[i]+=t[i]; });
  for(let i=0;i<dim;i++) avg[i]/=tokens.length;
  return avg;
}
function cosine(a,b){ let dot=0,ma=0,mb=0; for(let i=0;i<a.length;i++){ dot+=a[i]*b[i]; ma+=a[i]*a[i]; mb+=b[i]*b[i]; } return dot/(Math.sqrt(ma)*Math.sqrt(mb)+1e-12); }
module.exports = { getEmbedding, cosine };
