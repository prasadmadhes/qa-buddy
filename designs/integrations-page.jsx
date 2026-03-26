import React from 'react';
import {
  Link,
  CheckCircle,
  Settings,
  ExternalLink,
  RefreshCw,
  Webhook,
  LogOut,
  ChevronDown,
  Home,
  GitBranch,
  CheckSquare,
  Zap,
  BarChart3,
  Cog,
} from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">QA Buddy</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Home size={20} />
            <span>Overview</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <GitBranch size={20} />
            <span>Repositories</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <CheckSquare size={20} />
            <span>Test Cases</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Zap size={20} />
            <span>Generations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg transition font-medium"
          >
            <Link size={20} />
            <span>Integrations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Cog size={20} />
            <span>Settings</span>
          </a>
        </nav>

        {/* Org Switcher */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <span className="text-sm font-medium text-gray-900">Acme Corp</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
            <p className="text-gray-600 mt-1">Connect your test case management tools</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Connected Integrations Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* TestRail Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">TestRail</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Connected</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last synced</p>
                    <p className="text-sm font-medium text-gray-900">2 hours ago</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Test Cases Synced</p>
                  <p className="text-2xl font-bold text-gray-900">847</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Project Mapping: QA Buddy → TestRail Suite "Web App Tests"
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    <Settings size={16} />
                    Configure
                  </button>
                  <button className="flex-1 px-4 py-2 border border-red-200 rounded-lg text-red-700 font-medium hover:bg-red-50 transition flex items-center justify-center gap-2">
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Xray (Jira) Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Xray (Jira)</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Connected</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last synced</p>
                    <p className="text-sm font-medium text-gray-900">30 min ago</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Test Cases Synced</p>
                  <p className="text-2xl font-bold text-gray-900">1,203</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Project Mapping: QA Buddy → Jira Project "QAB"
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    <Settings size={16} />
                    Configure
                  </button>
                  <button className="flex-1 px-4 py-2 border border-red-200 rounded-lg text-red-700 font-medium hover:bg-red-50 transition flex items-center justify-center gap-2">
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Available Integrations Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Zephyr Scale Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Zephyr Scale</h4>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Test management for Jira teams
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Connect
                </button>
              </div>

              {/* qTest Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">qTest</h4>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Enterprise test management platform
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Connect
                </button>
              </div>

              {/* Azure Test Plans Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Azure Test Plans</h4>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Test management in Azure DevOps
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Connect
                </button>
              </div>

              {/* Custom Webhook Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Webhook size={24} className="text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Custom Webhook</h4>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Push test cases via webhooks
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Sync History Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync History</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Integration
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Direction
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Test Cases
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">TestRail</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Push</td>
                    <td className="px-6 py-4 text-sm text-gray-600">24</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={14} />
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">2026-03-26 14:32 UTC</td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Xray (Jira)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Push</td>
                    <td className="px-6 py-4 text-sm text-gray-600">31</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={14} />
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">2026-03-26 13:15 UTC</td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">TestRail</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Push</td>
                    <td className="px-6 py-4 text-sm text-gray-600">18</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                        Failed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">2026-03-26 11:42 UTC</td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Xray (Jira)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Push</td>
                    <td className="px-6 py-4 text-sm text-gray-600">27</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={14} />
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">2026-03-25 16:28 UTC</td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">TestRail</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Push</td>
                    <td className="px-6 py-4 text-sm text-gray-600">22</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={14} />
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">2026-03-25 09:15 UTC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
