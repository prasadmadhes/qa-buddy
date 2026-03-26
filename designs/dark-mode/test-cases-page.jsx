import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Edit2,
  ChevronRight,
  Filter,
  Check,
  X,
} from 'lucide-react';

export default function TestCasesPage() {
  const [expandedId, setExpandedId] = useState('tc-001');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const testCases = [
    {
      id: 'tc-001',
      title: 'User registration with valid email and password',
      status: 'Pending',
      category: 'Functional',
      priority: 'Critical',
      source: 'apps/api/routes/auth.py:45',
      objective: 'Verify that a new user can successfully register with valid credentials',
      preconditions: 'User is not logged in, Database is accessible, Email service is running',
      steps: [
        'Navigate to /signup page',
        'Enter valid email: test@example.com',
        'Enter password: SecurePass123!',
        'Click "Create Account" button',
        'Verify confirmation email is sent',
      ],
      expectedResult: 'User account is created, confirmation email sent, user redirected to login page',
      tags: ['auth', 'registration', 'core-feature'],
    },
    {
      id: 'tc-002',
      title: 'Login with incorrect password',
      status: 'Approved',
      category: 'Negative',
      priority: 'High',
      source: 'apps/api/routes/auth.py:78',
    },
    {
      id: 'tc-003',
      title: 'Repository scan with multiple file types',
      status: 'Pending',
      category: 'Integration',
      priority: 'High',
      source: 'apps/api/routes/repos.py:120',
    },
    {
      id: 'tc-004',
      title: 'Test case approval workflow',
      status: 'Approved',
      category: 'Functional',
      priority: 'Critical',
      source: 'apps/api/routes/test_cases.py:234',
    },
    {
      id: 'tc-005',
      title: 'Rate limit enforcement',
      status: 'Rejected',
      category: 'Edge Case',
      priority: 'Medium',
      source: 'apps/api/middleware/rate_limit.py:42',
    },
    {
      id: 'tc-006',
      title: 'TCM integration with TestRail',
      status: 'Approved',
      category: 'Integration',
      priority: 'High',
      source: 'packages/core/tcm/testrail.py:189',
    },
    {
      id: 'tc-007',
      title: 'Empty repository handling',
      status: 'Pending',
      category: 'Edge Case',
      priority: 'Medium',
      source: 'apps/worker/tasks/generate.py:67',
    },
    {
      id: 'tc-008',
      title: 'Concurrent generation jobs',
      status: 'Approved',
      category: 'Boundary',
      priority: 'High',
      source: 'apps/worker/celery_app.py:156',
    },
  ];

  const stats = [
    { label: 'Pending', value: '124', color: 'amber', icon: '⏳' },
    { label: 'Approved', value: '2487', color: 'emerald', icon: '✓' },
    { label: 'Rejected', value: '236', color: 'rose', icon: '✗' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
      Approved: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      Rejected: 'bg-rose-400/10 text-rose-400 border-rose-400/30',
    };
    return styles[status] || styles.Pending;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Functional: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      Negative: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      Integration: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Edge Case': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      Boundary: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Smoke: 'bg-green-500/20 text-green-300 border-green-500/30',
    };
    return colors[category] || colors.Functional;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Critical: 'text-rose-400',
      High: 'text-amber-400',
      Medium: 'text-blue-400',
      Low: 'text-slate-400',
    };
    return colors[priority] || colors.Medium;
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const isExpanded = (id) => expandedId === id;

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col p-6">
        <div className="mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            QA Buddy
          </div>
          <div className="text-xs text-slate-400 mt-1">Test Intelligence Platform</div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { icon: '📊', label: 'Overview', active: false },
            { icon: '📁', label: 'Repositories', active: false },
            { icon: '✓', label: 'Test Cases', active: true },
            { icon: '⚡', label: 'Generations', active: false },
            { icon: '🔗', label: 'Integrations', active: false },
            { icon: '📈', label: 'Analytics', active: false },
            { icon: '⚙️', label: 'Settings', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-all ${
                item.active
                  ? 'bg-slate-800 text-violet-400 border-l-2 border-violet-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-700/50 space-y-3">
          <button className="w-full px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition">
            Docs
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition">
            Support
          </button>
          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
              <div className="text-xs">
                <div className="text-slate-200 font-medium">Sarah Chen</div>
                <div className="text-slate-500">Engineering Org</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/50 border-b border-slate-700/50 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-50">Test Cases</h1>
              <p className="text-slate-400 mt-1">Review and approve generated test cases</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/20 transition">
              + Generate New
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`p-4 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/30`}
              >
                <div className={`text-${stat.color}-400 text-sm font-medium`}>{stat.label}</div>
                <div className={`text-${stat.color}-300 text-2xl font-bold mt-1`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search test cases..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition"
              />
            </div>

            <div className="flex gap-2">
              {['Status', 'Category', 'Priority', 'Repository'].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm hover:border-slate-600 hover:bg-slate-800/80 transition"
                >
                  <span>{filter}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-3">
          {testCases.map((testCase) => (
            <div key={testCase.id}>
              <div
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition cursor-pointer"
                onClick={() => setExpandedId(isExpanded(testCase.id) ? null : testCase.id)}
              >
                {/* Header Row */}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(testCase.id)}
                    onChange={() => toggleSelect(testCase.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer"
                  />

                  <ChevronRight
                    className={`w-5 h-5 text-slate-500 transition transform ${
                      isExpanded(testCase.id) ? 'rotate-90' : ''
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{testCase.title}</h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusBadge(testCase.status)}`}>
                        {testCase.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(testCase.category)}`}>
                        {testCase.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(testCase.priority)}`}>
                        ● {testCase.priority}
                      </span>
                      <code className="text-cyan-400 text-xs px-2 py-1 bg-slate-900/50 rounded font-mono">
                        {testCase.source}
                      </code>
                    </div>
                  </div>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {testCase.status === 'Pending' && (
                      <>
                        <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition" title="Approve">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {testCase.status === 'Approved' && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                    {testCase.status === 'Rejected' && (
                      <X className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded(testCase.id) && (
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg mt-2 p-6 space-y-6 ml-14">
                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Objective</h4>
                    <p className="text-slate-200">{testCase.objective}</p>
                  </div>

                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Preconditions</h4>
                    <p className="text-slate-300">{testCase.preconditions}</p>
                  </div>

                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Steps</h4>
                    <ol className="space-y-2 text-slate-300">
                      {testCase.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-medium">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Expected Result</h4>
                    <p className="text-slate-300">{testCase.expectedResult}</p>
                  </div>

                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Tags</h4>
                    <div className="flex gap-2 flex-wrap">
                      {testCase.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-slate-900 border-t border-slate-700/50 px-8 py-4 flex items-center justify-between">
            <div className="text-slate-300 text-sm">
              <span className="font-medium text-violet-400">{selectedIds.size}</span> test cases selected
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition flex items-center gap-2">
                <Check className="w-4 h-4" />
                Approve All
              </button>
              <button className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-sm font-medium transition flex items-center gap-2">
                <X className="w-4 h-4" />
                Reject All
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
