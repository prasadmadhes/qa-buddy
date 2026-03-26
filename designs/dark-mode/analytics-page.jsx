import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Zap,
  Settings,
  LogOut,
  Eye,
  Settings2,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Statistics
  const stats = [
    { label: 'Tests Generated', value: '12,847', color: 'violet' },
    { label: 'Approval Rate', value: '87%', color: 'emerald' },
    { label: 'Avg per Generation', value: '24', color: 'cyan' },
    { label: 'Active Repos', value: '12', color: 'amber' },
  ];

  // Test Cases Over Time (Line Chart)
  const timeSeriesData = [
    { date: 'Mar 1', count: 245 },
    { date: 'Mar 3', count: 520 },
    { date: 'Mar 5', count: 890 },
    { date: 'Mar 7', count: 1250 },
    { date: 'Mar 9', count: 1680 },
    { date: 'Mar 11', count: 2100 },
    { date: 'Mar 13', count: 2890 },
    { date: 'Mar 15', count: 3450 },
    { date: 'Mar 17', count: 4120 },
    { date: 'Mar 19', count: 4980 },
    { date: 'Mar 21', count: 5890 },
    { date: 'Mar 23', count: 6750 },
    { date: 'Mar 25', count: 7250 },
    { date: 'Mar 26', count: 7450 },
  ];

  // Approval vs Rejection (Bar Chart)
  const approvalData = [
    { month: 'Jan', approved: 2400, rejected: 340 },
    { month: 'Feb', approved: 3200, rejected: 520 },
    { month: 'Mar', approved: 4100, rejected: 640 },
  ];

  // By Category (Pie Chart)
  const categoryData = [
    { name: 'Functional', value: 4200 },
    { name: 'Regression', value: 1850 },
    { name: 'Edge Case', value: 1340 },
    { name: 'Smoke', value: 920 },
    { name: 'Negative', value: 590 },
  ];

  const categoryColors = {
    'Functional': '#a78bfa',
    'Regression': '#22d3ee',
    'Edge Case': '#10b981',
    'Smoke': '#fbbf24',
    'Negative': '#f43f5e',
  };

  // Top Repositories (Horizontal Bar Chart)
  const repoData = [
    { name: 'api-gateway', coverage: 92 },
    { name: 'user-service', coverage: 88 },
    { name: 'auth-module', coverage: 95 },
    { name: 'payment-processor', coverage: 76 },
    { name: 'notification-service', coverage: 82 },
  ];

  // Custom Tooltip for dark theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 shadow-lg">
          <p className="text-slate-50 text-sm font-medium">{payload[0].payload.date || payload[0].payload.month || payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-xs font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ label, value, color }) => {
    const colorMap = {
      violet: 'from-violet-500/20 to-violet-500/5',
      emerald: 'from-emerald-500/20 to-emerald-500/5',
      cyan: 'from-cyan-500/20 to-cyan-500/5',
      amber: 'from-amber-500/20 to-amber-500/5',
    };

    return (
      <div className={`bg-gradient-to-br ${colorMap[color]} border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm`}>
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        <p className="text-3xl font-bold text-slate-50">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-slate-50 font-bold text-lg">QA Buddy</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Repos</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Zap className="w-5 h-5" />
            <span>Test Cases</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Settings2 className="w-5 h-5" />
            <span>Integrations</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 text-cyan-400 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-slate-950">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header with Date Range */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-50 mb-2">Analytics</h2>
              <p className="text-slate-400">Test case generation and approval metrics</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-slate-50 text-sm font-medium outline-none cursor-pointer"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Test Cases Over Time */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Test Cases Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    dot={false}
                    name="Test Cases"
                    fill="#a78bfa"
                    fillOpacity={0.1}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Approval vs Rejection */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Approval vs Rejection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={approvalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#cbd5e1', fontSize: '12px' }}
                  />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="rejected" fill="#f43f5e" name="Rejected" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Row of Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By Category */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Distribution by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Repositories */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Coverage by Repository</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={repoData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    type="number"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                    domain={[0, 100]}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tick={{ fill: '#94a3b8' }}
                    width={140}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="coverage" fill="#a78bfa" radius={[0, 8, 8, 0]} name="Coverage %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
