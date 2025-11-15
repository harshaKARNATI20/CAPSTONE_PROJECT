const Interview = require('../models/Interview');

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const interviews = await Interview.find({ userId });
    if (!interviews.length) return res.json({ success: true, data: { averageScores: {}, chartData: [] } });

    const domainStats = {}, roundStats = {};
    interviews.forEach(i => {
      if (!domainStats[i.domain]) domainStats[i.domain] = [];
      domainStats[i.domain].push(Number(i.finalScore || 0));
      if (!roundStats[i.round]) roundStats[i.round] = [];
      roundStats[i.round].push(Number(i.finalScore || 0));
    });
    const avgDomain = {};
    for (const k of Object.keys(domainStats)) avgDomain[k] = +(domainStats[k].reduce((a,b)=>a+b,0)/domainStats[k].length).toFixed(2);
    const avgRound = {};
    for (const k of Object.keys(roundStats)) avgRound[k] = +(roundStats[k].reduce((a,b)=>a+b,0)/roundStats[k].length).toFixed(2);
    const timeline = interviews.map(i=>({ date: i.createdAt.toISOString().split('T')[0], score: Number(i.finalScore||0), domain: i.domain })).sort((a,b)=>new Date(a.date)-new Date(b.date));
    res.json({ success: true, data: { averageScores: { byDomain: avgDomain, byRound: avgRound }, chartData: { pie: Object.entries(avgDomain).map(([label,value])=>({label,value})), bar: Object.entries(avgRound).map(([label,value])=>({label,value})), line: timeline } } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message: err.message });
  }
};
