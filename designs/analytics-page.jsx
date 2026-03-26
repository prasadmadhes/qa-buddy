'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  LogOut,
  Settings,
  BarChart3,
  GitBranch,
  FileText,
  Zap,
  Plug,
  HelpCircle,
} from 'lucide-react';

// Mock data for generation trends (last 30 days)
const generationTrendsData = [
  { date: 'Mar 1', generated: 120 },
  { date: 'Mar 2', generated: 145 },
  { date: 'Mar 3', generated: 132 },
  { date: 'Mar 4', generated: 178 },
  { date: 'Mar 5', generated: 165 },
  { date: 'Mar 6', generated: 192 },
  { date: 'Mar 7', generated: 210 },
  { date: 'Mar 8', generated: 198 },
  { date: 'Mar 9', generated: 220 },
  { date: 'Mar 10', generated: 235 },
  { date: 'Mar 11', generated: 245 },
  { date: 'Mar 12', generated: 228 },
  { date: 'Mar 13', generated: 265 },
  { date: 'Mar 14', generated: 290 },
  { date: 'Mar 15', generated: 312 },
  { date: 'Mar 16', generated: 298 },
  { date: 'Mar 17', generated: 325 },
  { date: 'Mar 18', generated: 340 },
  { date: 'Mar 19', generated: 355 },
  { date: 'Mar 20', generated: 368 },
  { date: 'Mar 21', generated: 375 },
  { date: 'Mar 22', generated: 382 },
  { date: 'Mar 23', generated: 391 },
  { date: 'Mar 24', generated: 405 },
  { date: 'Mar 25', generated: 418 },
  { date: 'Mar 26', generated: 431 },
];

// Mock data for approval rate over time
const approvalRateData = [
  { date: 'Mar 1', approvalRate: 81.2 },
  { date: 'Mar 2', approvalRate: 82.1 },
  { date: 'Mar 3', approvalRate: 81.8 },
  { date: 'Mar 4', approvalRate: 83.5 },
  { date: 'Mar 5', approvalRate: 84.2 },
  { date: 'Mar 6', approvalRate: 85.1 },
  { date: 'Mar 7', approvalRate: 85.8 },
  { date: 'Mar 8', approvalRate: 86.1 },
  { date: 'Mar 9', approvalRate: 86.5 },
  { date: 'Mar 10', approvalRate: 86.9 },
  { date: 'Mar 11', approvalRate: 87.2 },
  { date: 'Mar 12', approvalRate: 87.0 },
  { date: 'Mar 13', approvalRate: 87.4 },
  { date: 'Mar 14', approvalRate: 87.7 },
  { date: 'Mar 15', approvalRate: 88.1 },
  { date: 'Mar 16', approvalRate: 88.0 },
  { date: 'Mar 17', approvalRate: 88.3 },
  { date: 'Mar 18', approvalRate: 88.5 },
  { date: 'Mar 19', approvalRate: 88.8 },
  { date: 'Mar 20', approvalRate: 88.9 },
  { date: 'Mar 21', approvalRate: 89.1 },
  { date: 'Mar 22', approvalRate: 89.0 },
  { date: 'Mar 23', approvalRate: 89.2 },
  { date: 'Mar 24', approvalRate: 89.4 },
  { date: 'Mar 25', approvalRate: 89.3 },
  { date: 'Mar 26', approvalRate: 87.3 },
];

// Mock data for test cases by category
const categoriesData = [
  { category: 'Smoke', count: 456 },
  { category: 'Functional', count: 1205 },
  { category: 'Regression', count: 892 },
  { category: 'Edge Case', count: 687 },
  { category: 'Negative', count: 542 },
  { category: 'Boundary', count: 449 },
];

// Mock data for coverage by repository
const coverageData = [
  { repo: 'api-service', coverage: 94 },
  { repo: 'auth-module', coverage: 89 },
  { repo: 'dashboard', coverage: 85 },
  { repo: 'mobile-app', coverage: 78 },
  { repo: 'payment-gateway', coverage: 76 },
];

// Mock data for top repositories table
const topRepositoriesTable = [
  {
    id: 1,
    name: 'api-service',
    totalTests: 1248,
    approved: 1176,
    rejected: 72,
    approvalRate: 94.2,
    lastGeneration: '2026-03-25 14:32',
  },
  {
    id: 2,
    name: 'auth-module',
    totalTests: 892,
    approved: 823,
    rejected: 69,
    approvalRate: 92.3,
    lastGeneration: '2026-03-24 09:15',
  },
  {
    id: 3,
    name: 'dashboard',
    totalTests: 756,
    approved: 682,
    rejected: 74,
    approvalRate: 90.2,
    lastGeneration: '2026-03-23 16:48',
  },
  {
    id: 4,
    name: 'mobile-app',
    totalTests: 645,
    approved: 542,
    rejected: 103,
    approvalRate: 84.0,
    lastGeneration: '2026-03-22 11:22',
  },
  {
    id: 5,
    name: 'payment-gateway',
    totalTests: 690,
    approved: 598,
    rejected: 92,
    approvalRate: 86.7,
    lastGeneration: '2026-03-20 13:05',
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-semibold text-gray-900">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={BarChart3} label="Overview" href="/dashboard/overview" />
          <NavItem icon={GitBranch} label="Repositories" href="/dashboard/repos" />
          <NavItem icon={FileText} label="Test Cases" href="/dashboard/test-cases" />
          <NavItem icon={Zap} label="Generations" href="/dashboard/generations" />
          <NavItem icon={Plug} label="Integrations" href="/dashboard/integrations" />
          <NavItem
            icon={BarChart3}
            label="Analytics"
            href="/dashboard/analytics"
            active
          />
          <NavItem icon={Settings} label="Settings" href="/dashboard/settings" />
        </nav>

        {/* Org Switcher */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="p-3 rounded-lg bg-gray-50 text-sm">
            <p className="text-gray-600 text-xs uppercase tracking-wide">Organization</p>
            <p className="font-semibold text-gray-900 mt-1">Acme Corp</p>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                Test case generation and approval metrics
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDateRange('7days')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === '7days'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 7 days
              </button>
              <button
                onClick={() => setDateRange('30days')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === '30days'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 30 days
              </button>
              <button
                onClick={() => setDateRange('90days')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === '90days'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 90 days
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Generated"
              value="4,231"
              change="+12.5%"
              positive
            />
            <StatCard
              title="Approval Rate"
              value="87.3%"
              change="+2.1%"
              positive
            />
            <StatCard
              title="Avg Generation Time"
              value="3m 24s"
              change="-8.2%"
              positive
            />
            <StatCard
              title="TCM Sync Success"
              value="99.2%"
              change="+0.3%"
              positive
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Generation Trends */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Generation Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="generated"
                    stroke="#4f46e5"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Approval Rate Over Time */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Approval Rate Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={approvalRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[75, 95]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="approvalRate"
                    stroke="#10b981"
                    fill="#d1fae5"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Test Cases by Category */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Test Cases by Category
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="category" type="category" stroke="#6b7280" style={{ fontSize: '12px' }} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Coverage by Repository */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Coverage by Repository
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={coverageData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} domain={[0, 100]} />
                  <YAxis dataKey="repo" type="category" stroke="#6b7280" style={{ fontSize: '12px' }} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="coverage" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Repositories Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Top Repositories by Test Cases
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Repository
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">
                      Total Tests
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">
                      Approved
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">
                      Rejected
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">
                      Approval Rate
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Last Generation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topRepositoriesTable.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        idx === topRepositoriesTable.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="text-right px-4 py-4 text-gray-600">
                        {row.totalTests.toLocaleString()}
                      </td>
                      <td className="text-right px-4 py-4 text-gray-600">
                        {row.approved.toLocaleString()}
                      </td>
                      <td className="text-right px-4 py-4 text-gray-600">
                        {row.rejected}
                      </td>
                      <td className="text-right px-4 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                          {row.approvalRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {row.lastGeneration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, href, active }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </a>
  );
}

function StatCard({ title, value, change, positive }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm font-medium mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change} vs last period
      </p>
    </div>
  );
}
