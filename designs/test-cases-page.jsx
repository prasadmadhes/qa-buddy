import React, { useState } from 'react';
import {
  Check,
  X,
  Pencil,
  Filter,
  ChevronDown,
  ChevronRight,
  FileCode,
  LogOut,
} from 'lucide-react';

const TestCasesPage = () => {
  const [expandedId, setExpandedId] = useState('tc-001');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const testCases = [
    {
      id: 'tc-001',
      title: 'Verify user login with valid credentials',
      status: 'Pending Review',
      category: 'Smoke',
      priority: 'Critical',
      source: 'src/auth/login.py:45',
      repo: 'api-core',
      generated: '2 hours ago',
      objective:
        'Ensure users can successfully log in with correct email and password combination',
      preconditions: [
        'User account exists in the system',
        'User has verified their email address',
        'User is not already logged in',
      ],
      steps: [
        'Navigate to the login page',
        'Enter valid email address in the email field',
        'Enter correct password in the password field',
        'Click the Login button',
        'Wait for page redirect',
      ],
      expectedResult:
        'User is authenticated, redirected to dashboard, and session token is set',
      tags: ['authentication', 'login', 'critical-path'],
    },
    {
      id: 'tc-002',
      title: 'Test payment processing with expired card',
      status: 'Pending Review',
      category: 'Edge Case',
      priority: 'High',
      source: 'src/payments/checkout.py:128',
      repo: 'api-core',
      generated: '3 hours ago',
      objective: 'Verify system gracefully handles payment processing with expired credit cards',
      preconditions: ['User is logged in', 'Cart contains valid items'],
      steps: [
        'Navigate to checkout page',
        'Add payment method with expired card',
        'Enter billing information',
        'Submit payment form',
      ],
      expectedResult:
        'System displays error message about expired card and prevents transaction',
      tags: ['payments', 'error-handling', 'edge-case'],
    },
    {
      id: 'tc-003',
      title: 'Validate API rate limiting returns 429',
      status: 'Approved',
      category: 'Functional',
      priority: 'High',
      source: 'src/api/middleware.py:76',
      repo: 'api-core',
      generated: '5 hours ago',
      objective: 'Ensure API correctly rate limits and returns 429 status code',
      preconditions: ['API is running', 'Rate limit is set to 10 requests/minute'],
      steps: [
        'Send 11 requests to the API within 1 minute',
        'Monitor HTTP status codes',
      ],
      expectedResult: 'First 10 requests return 200, 11th request returns 429',
      tags: ['api', 'rate-limiting', 'performance'],
    },
    {
      id: 'tc-004',
      title: 'Verify email validation on signup form',
      status: 'Rejected',
      category: 'Functional',
      priority: 'Medium',
      source: 'src/auth/signup.py:92',
      repo: 'api-core',
      generated: '1 day ago',
      objective: 'Ensure signup form validates email format correctly',
      preconditions: ['User is on signup page'],
      steps: ['Enter invalid email format', 'Submit form'],
      expectedResult: 'Form shows validation error and prevents submission',
      tags: ['authentication', 'validation'],
    },
    {
      id: 'tc-005',
      title: 'Test concurrent user session handling',
      status: 'Pending Review',
      category: 'Regression',
      priority: 'Critical',
      source: 'src/auth/session.py:164',
      repo: 'api-core',
      generated: '4 hours ago',
      objective: 'Verify system correctly handles multiple concurrent user sessions',
      preconditions: ['Multiple user accounts exist'],
      steps: [
        'Login user A from device 1',
        'Login user B from device 2',
        'Login user A from device 2',
        'Verify sessions are isolated',
      ],
      expectedResult:
        'Each session is independent, users see only their own data',
      tags: ['session-management', 'concurrency', 'security'],
    },
    {
      id: 'tc-006',
      title: 'Validate database connection pooling',
      status: 'Pending Review',
      category: 'Functional',
      priority: 'Medium',
      source: 'src/db/pool.py:34',
      repo: 'api-core',
      generated: '6 hours ago',
      objective: 'Ensure database connection pool maintains healthy connections',
      preconditions: ['Database is running'],
      steps: ['Monitor connection pool', 'Run concurrent queries', 'Monitor again'],
      expectedResult: 'Pool maintains between min and max connections',
      tags: ['database', 'performance', 'infrastructure'],
    },
    {
      id: 'tc-007',
      title: 'Test webhook payload signature verification',
      status: 'Approved',
      category: 'Security',
      priority: 'Critical',
      source: 'src/webhooks/handler.py:78',
      repo: 'api-core',
      generated: '2 days ago',
      objective: 'Verify webhook signature validation prevents tampering',
      preconditions: ['Webhook endpoint is configured'],
      steps: ['Send webhook with invalid signature', 'Send with valid signature'],
      expectedResult: 'Invalid signature rejected, valid signature accepted',
      tags: ['webhooks', 'security', 'integration'],
    },
    {
      id: 'tc-008',
      title: 'Verify pagination on large result sets',
      status: 'Pending Review',
      category: 'Functional',
      priority: 'Low',
      source: 'src/api/endpoints.py:245',
      repo: 'api-core',
      generated: '3 hours ago',
      objective: 'Ensure API pagination works correctly for large datasets',
      preconditions: ['Database contains 1000+ records'],
      steps: ['Request page 1', 'Request page 2', 'Request page 100'],
      expectedResult: 'Each page returns correct offset/limit of records',
      tags: ['api', 'pagination', 'performance'],
    },
  ];

  const statusColors = {
    'Pending Review': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    'Approved': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    'Rejected': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };

  const priorityColors = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-blue-100 text-blue-800',
    Low: 'bg-gray-100 text-gray-700',
  };

  const categoryColors = {
    Smoke: 'bg-purple-100 text-purple-800',
    Functional: 'bg-blue-100 text-blue-800',
    Regression: 'bg-indigo-100 text-indigo-800',
    'Edge Case': 'bg-yellow-100 text-yellow-800',
    Negative: 'bg-pink-100 text-pink-800',
    Security: 'bg-red-100 text-red-800',
  };

  const filteredCases = testCases.filter((tc) => {
    if (selectedStatus !== 'All' && tc.status !== selectedStatus) return false;
    if (selectedCategory !== 'All' && tc.category !== selectedCategory) return false;
    return true;
  });

  const pendingCount = testCases.filter((tc) => tc.status === 'Pending Review').length;
  const approvedCount = testCases.filter((tc) => tc.status === 'Approved').length;
  const rejectedCount = testCases.filter((tc) => tc.status === 'Rejected').length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-semibold text-gray-900">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">📊</span>
            <span className="text-sm font-medium">Overview</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">🏠</span>
            <span className="text-sm font-medium">Repositories</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg"
          >
            <span className="text-sm">✅</span>
            <span className="text-sm font-medium">Test Cases</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">⚙️</span>
            <span className="text-sm font-medium">Generations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">🔗</span>
            <span className="text-sm font-medium">Integrations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">📈</span>
            <span className="text-sm font-medium">Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">⚙️</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        {/* Org Switcher */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-200">
            <span>Acme Corp</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Logout */}
        <div className="px-4 pb-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 text-sm">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Test Cases</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Bulk Actions
            </button>
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Filters:</span>
            </div>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-gray-400"
            >
              <option>All</option>
              <option>Pending Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-gray-400"
            >
              <option>All</option>
              <option>Smoke</option>
              <option>Functional</option>
              <option>Regression</option>
              <option>Edge Case</option>
              <option>Negative</option>
              <option>Security</option>
            </select>

            {/* Repository Dropdown */}
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-gray-400">
              <option>All Repos</option>
              <option>api-core</option>
              <option>frontend</option>
              <option>worker</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search test cases..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex gap-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{approvedCount}</div>
              <div className="text-xs text-gray-600">Approved</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{rejectedCount}</div>
              <div className="text-xs text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="space-y-3">
            {filteredCases.map((tc) => {
              const isExpanded = expandedId === tc.id;
              const statusColor = statusColors[tc.status];

              return (
                <div key={tc.id} className="bg-white rounded-lg border border-gray-200">
                  {/* Collapsed View */}
                  <div
                    className="p-5 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpandedId(isExpanded ? null : tc.id)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Chevron */}
                      <div className="pt-1">
                        <ChevronRight
                          size={20}
                          className={`text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </div>

                      {/* Title and Badges */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-3">{tc.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Status Badge */}
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${statusColor.dot}`}
                            ></div>
                            {tc.status}
                          </div>

                          {/* Category Badge */}
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              categoryColors[tc.category]
                            }`}
                          >
                            {tc.category}
                          </div>

                          {/* Priority Badge */}
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              priorityColors[tc.priority]
                            }`}
                          >
                            {tc.priority}
                          </div>

                          {/* Source Reference */}
                          <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 ml-auto">
                            <FileCode size={14} />
                            <span className="font-mono">{tc.source}</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="text-right">
                        <div className="text-xs text-gray-600 mb-1">{tc.repo}</div>
                        <div className="text-xs text-gray-500">{tc.generated}</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition">
                          <Check size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition">
                          <X size={18} />
                        </button>
                        <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition">
                          <Pencil size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 px-5 py-5 bg-gray-50">
                      {/* Objective */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Objective
                        </h4>
                        <p className="text-sm text-gray-700">{tc.objective}</p>
                      </div>

                      {/* Preconditions */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Preconditions
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                          {tc.preconditions.map((pre, idx) => (
                            <li key={idx}>{pre}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Steps */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Steps
                        </h4>
                        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                          {tc.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Expected Result */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Expected Result
                        </h4>
                        <p className="text-sm text-gray-700">{tc.expectedResult}</p>
                      </div>

                      {/* Tags */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Tags
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                          {tc.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCasesPage;
