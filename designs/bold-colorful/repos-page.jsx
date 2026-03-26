'use client';

import React, { useState } from 'react';
import {
  Github,
  Search,
  Plus,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Zap,
  MoreVertical,
} from 'lucide-react';

export default function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const languages = [
    { name: 'All', value: 'all', color: 'bg-gray-200 text-gray-800' },
    { name: 'Python', value: 'python', color: 'bg-purple-200 text-purple-800' },
    { name: 'TypeScript', value: 'typescript', color: 'bg-blue-200 text-blue-800' },
    { name: 'Java', value: 'java', color: 'bg-orange-200 text-orange-800' },
    { name: 'Ruby', value: 'ruby', color: 'bg-pink-200 text-pink-800' },
    { name: 'Go', value: 'go', color: 'bg-cyan-200 text-cyan-800' },
  ];

  const repos = [
    {
      name: 'nextjs-ecommerce',
      path: 'acme/nextjs-ecommerce',
      language: 'typescript',
      languageLabel: 'TypeScript',
      stripeColor: 'bg-blue-600',
      testCases: 247,
      lastGenerated: '2 hours ago',
      coverage: 78,
      status: 'connected',
      statusColor: 'bg-emerald-500',
    },
    {
      name: 'api-auth-service',
      path: 'acme/api-auth-service',
      language: 'python',
      languageLabel: 'Python',
      stripeColor: 'bg-purple-600',
      testCases: 156,
      lastGenerated: '1 day ago',
      coverage: 92,
      status: 'connected',
      statusColor: 'bg-emerald-500',
    },
    {
      name: 'react-components',
      path: 'acme/react-components',
      language: 'typescript',
      languageLabel: 'TypeScript',
      stripeColor: 'bg-blue-600',
      testCases: 89,
      lastGenerated: '3 days ago',
      coverage: 65,
      status: 'connected',
      statusColor: 'bg-emerald-500',
    },
    {
      name: 'payment-gateway',
      path: 'acme/payment-gateway',
      language: 'java',
      languageLabel: 'Java',
      stripeColor: 'bg-orange-500',
      testCases: 312,
      lastGenerated: '5 hours ago',
      coverage: 88,
      status: 'scanning',
      statusColor: 'bg-orange-500',
    },
    {
      name: 'data-pipeline',
      path: 'acme/data-pipeline',
      language: 'python',
      languageLabel: 'Python',
      stripeColor: 'bg-purple-600',
      testCases: 0,
      lastGenerated: 'Never',
      coverage: 0,
      status: 'needs-setup',
      statusColor: 'bg-gray-400',
    },
    {
      name: 'mobile-sdk',
      path: 'acme/mobile-sdk',
      language: 'ruby',
      languageLabel: 'Ruby',
      stripeColor: 'bg-pink-500',
      testCases: 124,
      lastGenerated: '1 week ago',
      coverage: 71,
      status: 'connected',
      statusColor: 'bg-emerald-500',
    },
  ];

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repo.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || repo.language === languageFilter;
    const matchesStatus = statusFilter === 'all' || repo.status === statusFilter;
    return matchesSearch && matchesLanguage && matchesStatus;
  });

  const getLanguageBadgeColor = (language) => {
    const colors = {
      python: 'bg-purple-100 text-purple-700 border border-purple-200',
      typescript: 'bg-blue-100 text-blue-700 border border-blue-200',
      java: 'bg-orange-100 text-orange-700 border border-orange-200',
      ruby: 'bg-pink-100 text-pink-700 border border-pink-200',
      go: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
    };
    return colors[language] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'scanning':
        return 'Scanning';
      case 'needs-setup':
        return 'Needs Setup';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Repositories</h1>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-shadow flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Connect Repository
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Language Filter */}
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguageFilter(lang.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    languageFilter === lang.value
                      ? `${lang.color} ring-2 ring-offset-2 ring-gray-300`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="connected">Connected</option>
              <option value="scanning">Scanning</option>
              <option value="needs-setup">Needs Setup</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repos Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-6">
          {filteredRepos.map((repo, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              {/* Colored Top Stripe */}
              <div className={`h-2 ${repo.stripeColor}`} />

              <div className="p-6">
                {/* Header with Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition">{repo.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{repo.path}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${repo.statusColor}`} />
                </div>

                {/* Language Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getLanguageBadgeColor(repo.language)}`}>
                    {repo.languageLabel}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Test Cases</span>
                    <span className="font-semibold text-gray-900">{repo.testCases}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Generated</span>
                    <span className="text-sm text-gray-600">{repo.lastGenerated}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Coverage</span>
                      <span className="font-semibold text-gray-900">{repo.coverage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${repo.coverage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-600">
                    {getStatusLabel(repo.status)}
                  </span>
                  <div className="flex gap-2">
                    {repo.status === 'connected' ? (
                      <>
                        <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-md transition">
                          Generate
                        </button>
                        <button className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <Eye className="w-4 h-4" />
                        </button>
                      </>
                    ) : repo.status === 'scanning' ? (
                      <button className="px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-100 rounded-lg border border-orange-200 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Scanning
                      </button>
                    ) : (
                      <button className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-not-allowed">
                        Setup Repo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty Add Card */}
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Connect a new repository</h3>
            <p className="text-sm text-gray-500">Add your GitHub repo to start generating test cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}
