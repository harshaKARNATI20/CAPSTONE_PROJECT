const vader = require('vader-sentiment');
function analyzeSentiment(text){ return vader.SentimentIntensityAnalyzer.polarity_scores(text||''); }
function sentimentScore(compound){ return Math.round(((compound+1)/2)*10*10)/10; }
module.exports = { analyzeSentiment, sentimentScore };
