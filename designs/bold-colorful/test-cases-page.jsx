'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Search,
  Check,
  X,
  Edit2,
  Tag,
} from 'lucide-react';

export default function TestCasesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(0);

  const statusTabs = [
    { label: 'All', value: 'all', color: 'text-gray-700' },
    { label: 'Pending', value: 'pending', color: 'text-orange-700' },
    { label: 'Approved', value: 'approved', color: 'text-emerald-700' },
    { label: 'Rejected', value: 'rejected', color: 'text-pink-700' },
  ];

  const testCases = [
    {
      id: 0,
      title: 'Login with valid credentials',
      category: 'functional',
      priority: 'critical',
      status: 'pending',
      sourceFile: 'src/auth/login.ts',
      repo: 'api-auth-service',
      generatedTime: '2 hours ago',
      objective: 'Verify that users can successfully log in with valid email and password credentials.',
      preconditions: [
        'User is not logged in',
        'User has an active account',
        'Account is not locked or suspended',
      ],
      steps: [
        'Navigate to the login page',
        'Enter valid email address in the email field',
        'Enter valid password in the password field',
        'Click the "Sign In" button',
        'Wait for page to load',
      ],
      expectedResult: 'User is successfully authenticated and redirected to the dashboard. Session token is stored in secure cookie.',
      tags: ['auth', 'smoke', 'critical'],
    },
    {
      id: 1,
      title: 'Checkout with multiple items',
      category: 'functional',
      priority: 'critical',
      status: 'approved',
      sourceFile: 'src/pages/checkout/index.tsx',
      repo: 'nextjs-ecommerce',
      generatedTime: '3 hours ago',
    },
    {
      id: 2,
      title: 'Button renders with correct colors',
      category: 'smoke',
      priority: 'high',
      status: 'approved',
      sourceFile: 'src/components/Button.tsx',
      repo: 'react-components',
      generatedTime: '1 day ago',
    },
    {
      id: 3,
      title: 'Handle invalid payment method',
      category: 'edge-case',
      priority: 'high',
      status: 'rejected',
      sourceFile: 'src/services/payment.py',
      repo: 'payment-gateway',
      generatedTime: '4 hours ago',
    },
    {
      id: 4,
      title: 'API response time under 200ms',
      category: 'regression',
      priority: 'medium',
      status: 'pending',
      sourceFile: 'src/api/handlers.py',
      repo: 'api-auth-service',
      generatedTime: '5 hours ago',
    },
    {
      id: 5,
      title: 'SQL injection prevention',
      category: 'security',
      priority: 'critical',
      status: 'approved',
      sourceFile: 'src/db/queries.py',
      repo: 'api-auth-service',
      generatedTime: '1 day ago',
    },
    {
      id: 6,
      title: 'Boundary test - max string length',
      category: 'boundary',
      priority: 'medium',
      status: 'pending',
      sourceFile: 'src/validation/input.ts',
      repo: 'nextjs-ecommerce',
      generatedTime: '30 min ago',
    },
    {
      id: 7,
      title: 'User logout clears session',
      category: 'functional',
      priority: 'high',
      status: 'approved',
      sourceFile: 'src/auth/logout.ts',
      repo: 'api-auth-service',
      generatedTime: '2 days ago',
    },
  ];

  const filteredTestCases = testCases.filter((tc) => {
    const matchesStatus = statusFilter === 'all' || tc.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tc.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || tc.priority === priorityFilter;
    const matchesSearch = tc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  const stats = [
    { label: 'Pending', value: testCases.filter((tc) => tc.status === 'pending').length, bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
    { label: 'Approved', value: testCases.filter((tc) => tc.status === 'approved').length, bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    { label: 'Rejected', value: testCases.filter((tc) => tc.status === 'rejected').length, bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      functional: 'bg-purple-100 text-purple-700 border border-purple-200',
      regression: 'bg-blue-100 text-blue-700 border border-blue-200',
      'edge-case': 'bg-orange-100 text-orange-700 border border-orange-200',
      smoke: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
      negative: 'bg-pink-100 text-pink-700 border border-pink-200',
      security: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      boundary: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border border-red-200',
      high: 'bg-orange-100 text-orange-700 border border-orange-200',
      medium: 'bg-blue-100 text-blue-700 border border-blue-200',
      low: 'bg-gray-100 text-gray-700 border border-gray-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'pending':
        return 'border-l-4 border-orange-400';
      case 'approved':
        return 'border-l-4 border-emerald-500';
      case 'rejected':
        return 'border-l-4 border-pink-500';
      default:
        return 'border-l-4 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Test Cases</h1>
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {testCases.length}
              </span>
            </div>
            <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
              Bulk Actions
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 mb-6">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  statusFilter === tab.value
                    ? `text-gray-900 border-b-2 border-gray-900`
                    : `${tab.color} border-b-2 border-transparent hover:text-gray-900`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search test cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="functional">Functional</option>
              <option value="regression">Regression</option>
              <option value="smoke">Smoke</option>
              <option value="edge-case">Edge Case</option>
              <option value="negative">Negative</option>
              <option value="security">Security</option>
              <option value="boundary">Boundary</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bgColor} ${stat.textColor} px-6 py-3 rounded-full text-sm font-semibold`}>
              {stat.value} {stat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Test Cases List */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="space-y-4">
          {filteredTestCases.map((tc) => (
            <div
              key={tc.id}
              onClick={() => setExpandedId(expandedId === tc.id ? -1 : tc.id)}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer ${getStatusBorderColor(tc.status)}`}
            >
              {/* Collapsed State */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{tc.title}</h3>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(tc.category)}`}>
                        {tc.category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                      <code className="bg-gray-100 px-2 py-1 rounded font-mono text-purple-600">{tc.sourceFile}</code>
                      <span>•</span>
                      <span>{tc.repo}</span>
                      <span>•</span>
                      <span>{tc.generatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(tc.priority)}`}>
                      {tc.priority}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === tc.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-6">
                  {/* Objective */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Objective</h4>
                    <p className="text-gray-700">{tc.objective}</p>
                  </div>

                  {/* Preconditions */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Preconditions</h4>
                    <ul className="space-y-1 text-gray-700">
                      {tc.preconditions?.map((pc, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-purple-600 font-semibold">•</span>
                          <span>{pc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Steps</h4>
                    <ol className="space-y-1 text-gray-700">
                      {tc.steps?.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-purple-600 font-semibold flex-shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Expected Result */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Expected Result</h4>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded text-gray-700">
                      {tc.expectedResult}
                    </div>
                  </div>

                  {/* Tags */}
                  {tc.tags && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {tc.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-semibold border-2 border-purple-300 text-purple-700 rounded-full bg-purple-50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTestCases.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No test cases found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
