'use client';

import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const testCasesData = [
    { date: '1', value: 340 },
    { date: '5', value: 480 },
    { date: '10', value: 720 },
    { date: '15', value: 950 },
    { date: '20', value: 1200 },
    { date: '25', value: 1480 },
    { date: '30', value: 1847 },
  ];

  const approvalData = [
    { name: 'Approved', value: 1604, fill: '#10b981' },
    { name: 'Rejected', value: 243, fill: '#ec4899' },
  ];

  const categoryData = [
    { name: 'Functional', value: 4200, fill: '#9333ea' },
    { name: 'Regression', value: 3100, fill: '#ec4899' },
    { name: 'Edge Case', value: 2800, fill: '#f97316' },
    { name: 'Smoke', value: 1847, fill: '#3b82f6' },
    { name: 'Negative', value: 1200, fill: '#06b6d4' },
  ];

  const repoData = [
    { name: 'auth-service', value: 1450, gradient: 'from-purple-600 to-purple-400' },
    { name: 'payment-api', value: 1280, gradient: 'from-pink-600 to-pink-400' },
    { name: 'dashboard', value: 980, gradient: 'from-blue-600 to-blue-400' },
    { name: 'notification-hub', value: 750, gradient: 'from-orange-600 to-orange-400' },
    { name: 'search-engine', value: 620, gradient: 'from-cyan-600 to-cyan-400' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].payload.date || payload[0].name}</p>
          <p className="text-sm">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-slate-600 mt-2">Track test case generation, approval rates, and coverage</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tests Generated */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mb-4"></div>
            <p className="text-slate-600 text-sm font-medium mb-1">Tests Generated</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">12,847</p>
            <p className="text-emerald-600 text-xs font-semibold mt-2">+12% from last month</p>
          </div>

          {/* Approval Rate */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full mb-4"></div>
            <p className="text-slate-600 text-sm font-medium mb-1">Approval Rate</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">87%</p>
            <p className="text-emerald-600 text-xs font-semibold mt-2">+3% from last month</p>
          </div>

          {/* Avg per Generation */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"></div>
            <p className="text-slate-600 text-sm font-medium mb-1">Avg per Generation</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">24</p>
            <p className="text-slate-600 text-xs font-semibold mt-2">test cases</p>
          </div>

          {/* Active Repos */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-4"></div>
            <p className="text-slate-600 text-sm font-medium mb-1">Active Repos</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">12</p>
            <p className="text-slate-600 text-xs font-semibold mt-2">connected</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Cases Over Time */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 rounded-full mb-4"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Test Cases Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={testCasesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Approval vs Rejection */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="h-1 bg-gradient-to-r from-emerald-600 to-pink-600 rounded-full mb-4"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Approval vs Rejection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[approvalData[0], approvalData[1]]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }}
                  formatter={(value) => [value, '']}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} data={[approvalData[1]]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-700">Approved: {approvalData[0].value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-slate-700">Rejected: {approvalData[1].value}</span>
              </div>
            </div>
          </div>

          {/* By Category */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="h-1 bg-gradient-to-r from-orange-600 to-cyan-600 rounded-full mb-4"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Test Cases by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {categoryData.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.fill }}></div>
                  <span className="text-slate-700">{cat.name}: {cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Repos by Coverage */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Top Repos by Coverage</h3>
            <div className="space-y-4">
              {repoData.map((repo, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">{repo.name}</span>
                    <span className="text-sm font-bold text-slate-900">{repo.value}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${repo.gradient}`}
                      style={{ width: `${(repo.value / repoData[0].value) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
