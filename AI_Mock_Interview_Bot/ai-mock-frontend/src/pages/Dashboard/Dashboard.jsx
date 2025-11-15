import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Navbar from '../../components/Navbar';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/api/reports/analytics');
        setData(res.data.data);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError(err.response?.data?.message || 'Failed to load analytics');
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  // ... (rest of your chart code below this line)
const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const pie = data.chartData.pie || [];
  const bar = data.chartData.bar || [];
  const line = data.chartData.line || [];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm mb-2">Average by Domain</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={70}>
                  {pie.map((entry, idx)=> <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow col-span-2">
            <h3 className="text-sm mb-2">Average by Round</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bar}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">{bar.map((entry, idx)=><Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow col-span-3">
            <h3 className="text-sm mb-2">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={line}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
