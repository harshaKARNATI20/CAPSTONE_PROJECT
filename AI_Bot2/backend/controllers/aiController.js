const aiService = require('../services/ai/aiService');

exports.evaluate = async (req, res, next) => {
  try {
    const { questionId, questionText, userAnswer, transcript } = req.body;
    const out = await aiService.evaluateAnswer({ questionId, questionText, userAnswer, transcript });
    res.json(out);
  } catch (err) { next(err); }
};

exports.transcribe = async (req, res, next) => {
  try {
    // For demo: expect frontend to send 'transcript' if they transcribed client-side
    // Implement file upload + whisperAdapter.transcribeAudioFile when ready
    res.json({ message: 'Upload transcribe not implemented. Send "transcript" in body instead.' });
  } catch (err) { next(err); }
};
