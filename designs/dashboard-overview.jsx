import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  CheckSquare,
  Zap,
  Link,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  ChevronDown,
  Activity,
  Plus,
} from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              Q
            </div>
            <span className="font-semibold text-gray-900">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Overview */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600 cursor-pointer">
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Overview</span>
          </div>

          {/* Repositories */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <GitBranch size={20} />
            <span className="font-medium text-sm">Repositories</span>
          </div>

          {/* Test Cases */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <CheckSquare size={20} />
            <span className="font-medium text-sm">Test Cases</span>
          </div>

          {/* Generations */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <Zap size={20} />
            <span className="font-medium text-sm">Generations</span>
          </div>

          {/* Integrations */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <Link size={20} />
            <span className="font-medium text-sm">Integrations</span>
          </div>

          {/* Analytics */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <BarChart3 size={20} />
            <span className="font-medium text-sm">Analytics</span>
          </div>

          {/* Settings */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition">
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </div>
        </nav>

        {/* Org Switcher */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Acme Corp</p>
              <p className="text-xs text-gray-500">Workspace</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-700 font-medium">Overview</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Test Cases */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Test Cases</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+12.5%</span>
                      <span className="text-xs text-gray-500">vs last week</span>
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <CheckSquare size={24} className="text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Pending Review */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Pending Review</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">124</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingDown size={16} className="text-amber-600" />
                      <span className="text-sm text-amber-600 font-medium">-3.2%</span>
                      <span className="text-xs text-gray-500">vs last week</span>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Clock size={24} className="text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Approval Rate */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Approval Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">87.3%</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+2.1%</span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* Active Repos */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Repos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+1</span>
                      <span className="text-xs text-gray-500">this month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <GitBranch size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                <Plus size={18} />
                New Generation
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm">
                <CheckSquare size={18} />
                Review Queue
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Generations Table */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Generations</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium text-gray-700">Repository</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-700">Scope</th>
                        <th className="px-6 py-3 text-center font-medium text-gray-700">Test Cases</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">api-service</td>
                        <td className="px-6 py-4 text-gray-600">6 files</td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">42</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Mar 24, 2:30 PM</td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">web-frontend</td>
                        <td className="px-6 py-4 text-gray-600">components/</td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">38</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Mar 23, 10:15 AM</td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">auth-service</td>
                        <td className="px-6 py-4 text-gray-600">middleware/</td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">28</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            In Progress
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Mar 22, 3:45 PM</td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">payment-gateway</td>
                        <td className="px-6 py-4 text-gray-600">Full repo</td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">56</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Mar 21, 9:20 AM</td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">data-pipeline</td>
                        <td className="px-6 py-4 text-gray-600">workers/</td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-900">31</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Mar 20, 5:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 text-center">
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View all generations →
                  </button>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                  <Activity size={18} className="text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
                </div>

                <div className="px-6 py-4 flex-1 space-y-4 overflow-y-auto">
                  {/* Activity Item 1 */}
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Test case approved</p>
                        <p className="text-xs text-gray-500 mt-1">
                          5 test cases from <span className="font-medium">api-service</span> approved
                        </p>
                        <p className="text-xs text-gray-400 mt-2">2 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap size={16} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Generation completed</p>
                        <p className="text-xs text-gray-500 mt-1">
                          42 test cases generated for <span className="font-medium">api-service</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">24 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <GitBranch size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Repository connected</p>
                        <p className="text-xs text-gray-500 mt-1">
                          New repository <span className="font-medium">web-frontend</span> connected
                        </p>
                        <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Item 4 */}
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <AlertCircle size={16} className="text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Test case rejected</p>
                        <p className="text-xs text-gray-500 mt-1">
                          1 test case from <span className="font-medium">payment-gateway</span> rejected
                        </p>
                        <p className="text-xs text-gray-400 mt-2">3 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Item 5 */}
                  <div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Link size={16} className="text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">TCM sync completed</p>
                        <p className="text-xs text-gray-500 mt-1">
                          28 test cases synced to <span className="font-medium">TestRail</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 text-center bg-gray-50">
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View all activity →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
