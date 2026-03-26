import React, { useState } from 'react';
import {
  Zap,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader,
  FileCode,
  User,
  ChevronDown,
  Settings,
  BarChart3,
  GitBranch,
  TestTube,
  Plug,
  Home,
  LogOut,
} from 'lucide-react';

export default function GenerationsPage() {
  const [expandedRow, setExpandedRow] = useState(0); // Expand first row

  const generations = [
    {
      id: 1,
      status: 'Completed',
      statusColor: 'green',
      repo: 'auth-service',
      scope: 'Full repo',
      testCases: 24,
      duration: '2m 34s',
      tokens: '45.2k',
      triggeredBy: 'Sarah Chen',
      avatar: 'SC',
      date: 'Mar 26, 2:45 PM',
    },
    {
      id: 2,
      status: 'In Progress',
      statusColor: 'amber',
      repo: 'api-gateway',
      scope: 'src/routes/*',
      testCases: 18,
      duration: 'Running...',
      tokens: '28.4k',
      triggeredBy: 'Marcus Lee',
      avatar: 'ML',
      date: 'Mar 26, 2:15 PM',
    },
    {
      id: 3,
      status: 'Completed',
      statusColor: 'green',
      repo: 'payments-core',
      scope: '5 files selected',
      testCases: 12,
      duration: '1m 52s',
      tokens: '32.1k',
      triggeredBy: 'You',
      avatar: 'JD',
      date: 'Mar 26, 1:30 PM',
    },
    {
      id: 4,
      status: 'Failed',
      statusColor: 'red',
      repo: 'notification-service',
      scope: 'Full repo',
      testCases: 0,
      duration: '45s',
      tokens: '12.3k',
      triggeredBy: 'Alex Rivera',
      avatar: 'AR',
      date: 'Mar 26, 12:45 PM',
    },
    {
      id: 5,
      status: 'Completed',
      statusColor: 'green',
      repo: 'user-service',
      scope: 'src/models/*',
      testCases: 19,
      duration: '3m 12s',
      tokens: '52.5k',
      triggeredBy: 'Sarah Chen',
      avatar: 'SC',
      date: 'Mar 25, 4:20 PM',
    },
    {
      id: 6,
      status: 'Queued',
      statusColor: 'gray',
      repo: 'analytics-engine',
      scope: 'Full repo',
      testCases: null,
      duration: 'Pending...',
      tokens: '—',
      triggeredBy: 'You',
      avatar: 'JD',
      date: 'Mar 25, 3:55 PM',
    },
    {
      id: 7,
      status: 'Completed',
      statusColor: 'green',
      repo: 'auth-service',
      scope: 'src/middleware/*',
      testCases: 8,
      duration: '1m 15s',
      tokens: '18.6k',
      triggeredBy: 'Marcus Lee',
      avatar: 'ML',
      date: 'Mar 25, 2:30 PM',
    },
    {
      id: 8,
      status: 'In Progress',
      statusColor: 'amber',
      repo: 'frontend-web',
      scope: 'src/components/*',
      testCases: 15,
      duration: '1m 45s',
      tokens: '38.7k',
      triggeredBy: 'Alex Rivera',
      avatar: 'AR',
      date: 'Mar 25, 1:00 PM',
    },
  ];

  const detailSteps = [
    { name: 'Code Fetching', completed: true },
    { name: 'Analyzing', completed: true },
    { name: 'Generating', completed: false, active: true },
    { name: 'Storing', completed: false, active: false },
  ];

  const filesBeingProcessed = [
    'src/middleware/auth.py (92 lines)',
    'src/middleware/rate-limit.py (156 lines)',
    'src/utils/jwt.py (84 lines)',
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Loader className="w-5 h-5 text-amber-600 animate-spin" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Queued':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBgColor = (color) => {
    const colors = {
      green: 'bg-green-50 text-green-700',
      amber: 'bg-amber-50 text-amber-700',
      red: 'bg-red-50 text-red-700',
      gray: 'bg-gray-50 text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  const getAvatarBg = (letter) => {
    const colors = {
      S: 'bg-purple-500',
      M: 'bg-blue-500',
      A: 'bg-pink-500',
      J: 'bg-indigo-500',
    };
    return colors[letter[0]] || 'bg-indigo-500';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Main
          </div>
          <NavLink icon={Home} label="Overview" href="#" />
          <NavLink icon={GitBranch} label="Repositories" href="#" />
          <NavLink icon={TestTube} label="Test Cases" href="#" />
          <NavLink
            icon={Loader}
            label="Generations"
            href="#"
            active={true}
          />
          <NavLink icon={Plug} label="Integrations" href="#" />
          <NavLink icon={BarChart3} label="Analytics" href="#" />
          <NavLink icon={Settings} label="Settings" href="#" />
        </nav>

        {/* Org Switcher & Logout */}
        <div className="absolute bottom-0 left-0 right-0 w-64 px-4 py-4 border-t border-gray-200 bg-white space-y-2">
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-between">
            <span>Acme Corp</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Generations</h1>
            <div className="flex items-center gap-3">
              {/* Date Range Filter */}
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>

              {/* New Generation Button */}
              <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                New Generation
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-3 gap-8">
          {/* Generation Jobs Table */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Repository</div>
                  <div className="col-span-2">Scope</div>
                  <div className="col-span-1">Test Cases</div>
                  <div className="col-span-1">Duration</div>
                  <div className="col-span-1">Tokens</div>
                  <div className="col-span-2">Triggered By</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {generations.map((gen, idx) => (
                  <div key={gen.id}>
                    <div
                      onClick={() =>
                        setExpandedRow(expandedRow === idx ? -1 : idx)
                      }
                      className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition ${
                        expandedRow === idx ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Status */}
                        <div className="col-span-2 flex items-center gap-2">
                          {getStatusIcon(gen.status)}
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgColor(
                              gen.statusColor
                            )}`}
                          >
                            {gen.status}
                          </span>
                        </div>

                        {/* Repository */}
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-900">
                            {gen.repo}
                          </p>
                        </div>

                        {/* Scope */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">{gen.scope}</p>
                        </div>

                        {/* Test Cases */}
                        <div className="col-span-1">
                          <p className="text-sm font-medium text-gray-900">
                            {gen.testCases || '—'}
                          </p>
                        </div>

                        {/* Duration */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-600">{gen.duration}</p>
                        </div>

                        {/* Tokens */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-600">{gen.tokens}</p>
                        </div>

                        {/* Triggered By */}
                        <div className="col-span-2 flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${getAvatarBg(
                              gen.avatar
                            )}`}
                          >
                            {gen.avatar}
                          </div>
                          <span className="text-sm text-gray-900">
                            {gen.triggeredBy}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center gap-1">
                          <button className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded">
                            <ChevronDown
                              className={`w-4 h-4 transition ${
                                expandedRow === idx ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-gray-500 mt-1">{gen.date}</p>
                    </div>

                    {/* Expanded Detail Row */}
                    {expandedRow === idx && (
                      <div className="bg-indigo-50 border-t border-indigo-200 px-6 py-4">
                        <div className="flex items-center gap-4">
                          <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-200">
                            View
                          </button>
                          <button className="px-3 py-1 bg-white border border-indigo-300 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-50 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />
                            Re-generate
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Generation Detail Panel */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="text-sm font-bold text-gray-900 mb-4">
                Live Generation
              </h2>

              {/* Progress Bar */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Analyzing code... 67%
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: '67%' }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="mb-6 space-y-3">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Process Steps
                </p>
                {detailSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : step.active ? (
                        <Loader className="w-5 h-5 text-amber-600 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        step.completed
                          ? 'text-green-600'
                          : step.active
                            ? 'text-amber-600'
                            : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Files Being Processed */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Files Processing
                </p>
                <div className="space-y-2">
                  {filesBeingProcessed.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                    >
                      <FileCode className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-700">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Log Preview */}
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Real-time Log
                </p>
                <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono text-gray-300 max-h-32 overflow-y-auto">
                  <div className="mb-1">
                    <span className="text-green-400">✓</span> Fetched 3 files
                    (892 lines)
                  </div>
                  <div className="mb-1">
                    <span className="text-green-400">✓</span> Extracted 12
                    functions
                  </div>
                  <div className="mb-1">
                    <span className="text-green-400">✓</span> Identified 8
                    dependencies
                  </div>
                  <div className="text-amber-400">
                    <Loader className="w-3 h-3 inline animate-spin mr-1" />
                    Calling Claude API...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ icon: Icon, label, href, active = false }) {
  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-lg flex items-center gap-3 text-sm font-medium transition ${
        active
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
}
