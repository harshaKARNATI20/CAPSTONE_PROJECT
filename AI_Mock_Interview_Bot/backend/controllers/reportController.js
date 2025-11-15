const Report = require('../models/Report');
const Interview = require('../models/Interview');

/**
 * @desc    Get analytics data for the logged-in user
 * @route   GET /api/reports/analytics
 * @access  Private
 */
exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Get all completed interviews
    const interviews = await Interview.find({ userId });

    if (!interviews.length) {
      return res.json({
        success: true,
        message: 'No interview data found for this user.',
        data: { averageScores: {}, chartData: [] }
      });
    }

    // 2️⃣ Aggregate performance by domain & round
    const domainStats = {};
    const roundStats = {};

    interviews.forEach(int => {
      // Domain-based stats
      if (!domainStats[int.domain]) domainStats[int.domain] = [];
      domainStats[int.domain].push(Number(int.finalScore || 0));

      // Round-based stats
      if (!roundStats[int.round]) roundStats[int.round] = [];
      roundStats[int.round].push(Number(int.finalScore || 0));
    });

    // 3️⃣ Calculate averages
    const avgDomain = {};
    for (const [domain, arr] of Object.entries(domainStats)) {
      avgDomain[domain] = +(arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2);
    }

    const avgRound = {};
    for (const [round, arr] of Object.entries(roundStats)) {
      avgRound[round] = +(arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2);
    }

    // 4️⃣ Prepare time-series data (for line chart)
    const timeline = interviews.map(i => ({
      date: i.createdAt.toISOString().split('T')[0],
      score: Number(i.finalScore || 0),
      domain: i.domain
    })).sort((a,b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      data: {
        averageScores: { byDomain: avgDomain, byRound: avgRound },
        chartData: {
          pie: Object.entries(avgDomain).map(([label,value]) => ({ label, value })),
          bar: Object.entries(avgRound).map(([label,value]) => ({ label, value })),
          line: timeline
        }
      }
    });

  } catch (err) {
    console.error('Analytics error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
