'use client';

import React, { useState } from 'react';
import { ChevronDown, Play, RotateCcw, Eye, Zap } from 'lucide-react';

const GenerationsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const generations = [
    { id: 1, repo: 'auth-service', scope: 'api/auth/*', tests: 34, status: 'completed', duration: '3m 24s', date: '2026-03-26', cost: '$0.12', progress: 100 },
    { id: 2, repo: 'payment-api', scope: 'api/payments/*', tests: 28, status: 'completed', duration: '2m 51s', date: '2026-03-25', cost: '$0.09', progress: 100 },
    { id: 3, repo: 'user-service', scope: 'src/models/user.py', tests: 22, status: 'completed', duration: '2m 15s', date: '2026-03-24', cost: '$0.08', progress: 100 },
    { id: 4, repo: 'dashboard', scope: 'src/pages/overview', tests: 19, status: 'completed', duration: '1m 47s', date: '2026-03-23', cost: '$0.07', progress: 100 },
    { id: 5, repo: 'auth-service', scope: 'api/oauth/*', tests: 31, status: 'completed', duration: '3m 12s', date: '2026-03-22', cost: '$0.11', progress: 100 },
    { id: 6, repo: 'notification-hub', scope: 'workers/email', tests: 16, status: 'completed', duration: '1m 33s', date: '2026-03-21', cost: '$0.06', progress: 100 },
    { id: 7, repo: 'api-gateway', scope: 'middleware/*', tests: 25, status: 'completed', duration: '2m 38s', date: '2026-03-20', cost: '$0.09', progress: 100 },
    { id: 8, repo: 'search-engine', scope: 'indexing/pipeline', tests: 20, status: 'completed', duration: '2m 05s', date: '2026-03-19', cost: '$0.08', progress: 100 },
  ];

  const activeGen = {
    repo: 'analytics-service',
    scope: 'api/analytics/aggregations.py',
    progress: 65,
    tokens: 8420,
    steps: [
      { name: 'Fetching Code', done: true },
      { name: 'Analyzing', done: true },
      { name: 'Generating', done: false },
      { name: 'Review pending', done: false },
    ]
  };

  const statusColors = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_progress: 'bg-orange-100 text-orange-700 border-orange-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    queued: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const statusBgGradient = {
    completed: 'from-emerald-50 to-teal-50',
    in_progress: 'from-orange-50 to-amber-50',
    failed: 'from-red-50 to-pink-50',
    queued: 'from-purple-50 to-indigo-50',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Generations
            </h1>
            <p className="text-slate-600 mt-1">View and manage test case generations</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
            <Zap size={18} />
            New Generation
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-6">
        {/* Active Generation Banner */}
        <div className={`bg-gradient-to-r ${statusBgGradient['in_progress']} border-2 border-orange-200 rounded-2xl p-6`}>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">Active Generation</h3>
                <p className="text-slate-600 text-sm mt-1">Generating tests for {activeGen.scope}</p>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-700">Running</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold text-slate-900">{activeGen.progress}%</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden border border-orange-200">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all"
                  style={{ width: `${activeGen.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              {activeGen.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? 'bg-emerald-500 text-white'
                      : idx === 2
                      ? 'bg-orange-500 text-white animate-spin'
                      : 'bg-slate-300 text-slate-600'
                  }`}>
                    {step.done ? '✓' : idx === 2 ? '⟳' : '○'}
                  </div>
                  <span className={`text-xs font-medium ${step.done ? 'text-slate-700' : idx === 2 ? 'text-orange-700' : 'text-slate-500'}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Token Usage */}
            <div className="pt-2">
              <p className="text-xs text-slate-600">Tokens used: <span className="font-semibold text-slate-900">{activeGen.tokens.toLocaleString()}</span></p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-sm font-medium text-slate-600">Status:</span>
          {['all', 'completed', 'in_progress', 'queued', 'failed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Generations Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Repo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Scope</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tests Generated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {generations.map((gen, idx) => (
                  <tr key={gen.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{gen.repo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 text-sm">{gen.scope}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{gen.tests}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[gen.status]}`}>
                        {gen.status.charAt(0).toUpperCase() + gen.status.slice(1).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 text-sm">{gen.duration}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 text-sm">{gen.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{gen.cost}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-purple-600" title="Re-run">
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Showing 1-8 of 47 generations</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg font-medium transition-all ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationsPage;
