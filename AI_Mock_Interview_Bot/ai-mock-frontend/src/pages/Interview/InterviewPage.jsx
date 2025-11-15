import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';

export default function InterviewPage() {
  const [starting, setStarting] = useState(false);
  const [interview, setInterview] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [domain, setDomain] = useState('FullStack.Web.MERN');
  const [level, setLevel] = useState('Beginner');

  // 🔊 Text-to-Speech Function
  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser.');
    }
  };

  // 🔁 Speak automatically when new question selected
  useEffect(() => {
    if (interview && interview.questions[selectedIndex]) {
      const q = interview.questions[selectedIndex].questionText;
      speakQuestion(q);
    }
  }, [selectedIndex, interview]);

  // 🌐 Domains & Levels
  const domains = [
    'FullStack.Web.MERN',
    'FullStack.Web.Java',
    'FullStack.Web.Python',
    'DataScience',
    'SoftwareTesting',
    'GameDevelopment.Unity',
    'MachineLearning',
    'CloudComputing',
    'DSA',
    'Networking',
    'OperatingSystems',
    'DBMS',
    'SystemDesign'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // ▶️ Start Interview
  const startInterview = async () => {
    setStarting(true);
    try {
      const res = await api.post('/api/interviews/start', {
        domain,
        level,
        round: 'Technical',
      });
      setInterview(res.data.data);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to start interview');
    } finally {
      setStarting(false);
    }
  };

  //  Submit Answer
  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please write or speak your answer before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      const interviewId = interview.interviewId;
      const qid = interview.questions[selectedIndex].qid;
      const res = await api.post(`/api/interviews/${interviewId}/answer`, {
        qid,
        userAnswer: answer,
      });

      const feedback = res.data.data;
      setInterview((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        copy.questions[selectedIndex].userAnswer = answer;
        copy.questions[selectedIndex].aiFeedback = feedback;
        copy.questions[selectedIndex].score = feedback.finalScore;
        return copy;
      });
      setAnswer('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  // 🏁 Finish Interview
  const finishInterview = async () => {
    if (!interview) return;
    try {
      const res = await api.post(`/api/interviews/${interview.interviewId}/finish`);
      alert('Interview completed! Final score: ' + res.data.data.finalScore);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to finish interview');
    }
  };

  if (starting) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* 🌟 START PAGE */}
        {!interview ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Start Your Mock Interview</h2>
            <p className="text-gray-600 mb-8">
              Choose a domain and difficulty level to begin.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border px-4 py-2 rounded-lg text-gray-700 shadow-sm focus:ring focus:ring-blue-200"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border px-4 py-2 rounded-lg text-gray-700 shadow-sm focus:ring focus:ring-blue-200"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={startInterview}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              🚀 Start Interview
            </button>
          </div>
        ) : (
          // 🌟 INTERVIEW IN PROGRESS
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Interview Session — {domain} ({level})
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Questions */}
              <div className="md:w-1/3">
                <ul className="space-y-2">
                  {interview.questions.map((q, idx) => (
                    <li
                      key={q.qid}
                      className={`p-3 rounded-lg border cursor-pointer ${
                        idx === selectedIndex
                          ? 'bg-blue-50 border-blue-400'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedIndex(idx)}
                    >
                      <div className="text-sm font-medium">Q{idx + 1}</div>
                      <div className="text-xs text-gray-600 truncate">
                        {q.questionText}
                      </div>
                      {q.score && (
                        <div className="mt-2 text-sm text-green-600">
                          Score: {q.score}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={finishInterview}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Finish Interview
                  </button>
                </div>
              </div>

              {/* Main Question Panel */}
              <div className="md:w-2/3 bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">Question</h3>
                <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                  {interview.questions[selectedIndex].questionText}
                </p>

                {/* 🔊 Speak Question Button */}
                <button
                  onClick={() =>
                    speakQuestion(interview.questions[selectedIndex].questionText)
                  }
                  className="mb-4 bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
                >
                  🔊 Speak Again
                </button>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border rounded-lg h-40 mb-3 focus:ring focus:ring-blue-200 outline-none"
                ></textarea>

                <div className="flex gap-3">
                  <button
                    onClick={submitAnswer}
                    disabled={submitting}
                    className={`${
                      submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-4 py-2 rounded transition`}
                  >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                  </button>
                </div>

                {/* 🧠 AI FEEDBACK */}
                {interview.questions[selectedIndex].aiFeedback && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-2">AI Feedback</h4>
                    <p>
                      <strong>Final Score:</strong>{' '}
                      {interview.questions[selectedIndex].aiFeedback.finalScore}/10
                    </p>
                    <p>
                      <strong>Semantic:</strong>{' '}
                      {interview.questions[selectedIndex].aiFeedback.semanticScore}
                    </p>
                    <p>
                      <strong>Keyword:</strong>{' '}
                      {interview.questions[selectedIndex].aiFeedback.keywordScore}
                    </p>
                    <p>
                      <strong>Sentiment:</strong>{' '}
                      {interview.questions[selectedIndex].aiFeedback.sentimentScore}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Missing Keywords:</strong>{' '}
                      {(
                        interview.questions[selectedIndex].aiFeedback
                          .missingKeywords || []
                      ).join(', ') || 'None'}
                    </p>
                    <p className="text-sm mt-2">
                      {interview.questions[selectedIndex].aiFeedback.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
