'use client';

import React, { useState } from 'react';
import { ChevronDown, Link as LinkIcon, Trash2, Settings, Copy } from 'lucide-react';

const IntegrationsPage = () => {
  const [expandedSync, setExpandedSync] = useState(null);

  const connectedIntegrations = [
    {
      id: 'testrail',
      name: 'TestRail',
      color: 'emerald',
      icon: 'T',
      status: 'Connected',
      lastSync: '2 hours ago',
      totalSynced: 847,
      syncHistory: [
        { date: '2026-03-26 14:32', count: 24, status: 'success' },
        { date: '2026-03-26 11:15', count: 18, status: 'success' },
        { date: '2026-03-25 16:48', count: 31, status: 'success' },
        { date: '2026-03-25 09:22', count: 22, status: 'success' },
        { date: '2026-03-24 15:10', count: 28, status: 'success' },
      ]
    },
    {
      id: 'xray',
      name: 'Xray for Jira',
      color: 'blue',
      icon: 'X',
      status: 'Connected',
      lastSync: '5 hours ago',
      totalSynced: 612,
      syncHistory: [
        { date: '2026-03-26 10:45', count: 19, status: 'success' },
        { date: '2026-03-25 14:20', count: 25, status: 'success' },
        { date: '2026-03-25 08:30', count: 20, status: 'success' },
        { date: '2026-03-24 16:15', count: 17, status: 'failed' },
        { date: '2026-03-24 12:00', count: 0, status: 'failed' },
      ]
    },
  ];

  const availableIntegrations = [
    { id: 'zephyr', name: 'Zephyr Scale', color: 'purple', description: 'Test automation within Jira' },
    { id: 'qtest', name: 'qTest', color: 'orange', description: 'Comprehensive test management' },
    { id: 'azure', name: 'Azure Test Plans', color: 'blue', description: 'Azure DevOps test management' },
    { id: 'custom', name: 'Custom API', color: 'gradient', description: 'Custom webhook integration' },
  ];

  const colorClasses = {
    emerald: { icon: 'bg-emerald-100 text-emerald-700', border: 'border-l-4 border-l-emerald-500', pill: 'bg-emerald-100 text-emerald-700' },
    blue: { icon: 'bg-blue-100 text-blue-700', border: 'border-l-4 border-l-blue-500', pill: 'bg-blue-100 text-blue-700' },
    purple: { icon: 'bg-purple-100 text-purple-700', border: 'border-l-4 border-l-purple-500', accent: 'from-purple-600 to-purple-400' },
    orange: { icon: 'bg-orange-100 text-orange-700', border: 'border-l-4 border-l-orange-500', accent: 'from-orange-600 to-orange-400' },
    gradient: { accent: 'from-purple-600 via-pink-500 to-orange-400' },
  };

  const statusDotColor = (status) => {
    return status === 'success' ? 'bg-emerald-400' : 'bg-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Integrations
        </h1>
        <p className="text-slate-600 mt-2">Connect your test case management tools to sync approved test cases</p>
      </div>

      <div className="px-8 pb-8 space-y-8">
        {/* Connected Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Connected</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedIntegrations.map(integration => (
              <div key={integration.id} className={`bg-white rounded-2xl shadow-sm border ${colorClasses[integration.color].border} p-6 hover:shadow-md transition-shadow`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${colorClasses[integration.color].icon}`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{integration.name}</h3>
                      <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[integration.color].pill}`}>
                        ✓ {integration.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                      <Settings size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Last synced</span>
                    <span className="font-medium text-slate-900">{integration.lastSync}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total test cases synced</span>
                    <span className="font-bold text-slate-900 text-lg">{integration.totalSynced}</span>
                  </div>
                </div>

                {/* Sync History Toggle */}
                <button
                  onClick={() => setExpandedSync(expandedSync === integration.id ? null : integration.id)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700 mt-4"
                >
                  <span>Sync History</span>
                  <ChevronDown size={16} className={`transition-transform ${expandedSync === integration.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Sync History */}
                {expandedSync === integration.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {integration.syncHistory.map((sync, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${statusDotColor(sync.status)}`}></div>
                          <span className="text-slate-700">{sync.date}</span>
                        </div>
                        <span className="font-medium text-slate-900">{sync.count} cases</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm">
                    Configure
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                    Sync Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableIntegrations.map(integration => (
              <div
                key={integration.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-200 p-6 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-4 ${
                  integration.color === 'gradient'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white'
                    : colorClasses[integration.color].icon
                }`}>
                  {integration.id.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{integration.description}</p>
                <button className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  integration.color === 'gradient'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white hover:shadow-lg'
                    : `border-2 ${
                      integration.color === 'purple'
                        ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
                        : integration.color === 'orange'
                        ? 'border-orange-600 text-orange-600 hover:bg-orange-50'
                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`
                }`}>
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Custom Webhooks</h2>
            <p className="text-slate-600 mb-6">Push test cases to your custom endpoint when they're approved</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Webhook URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://your-api.example.com/webhook"
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                  />
                  <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Copy size={18} className="text-slate-700" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Trigger Events</label>
                <div className="space-y-2">
                  {['Test case approved', 'Test case rejected', 'Generation completed', 'Sync failed'].map(event => (
                    <label key={event} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-purple-600" />
                      <span className="text-slate-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                  Test Webhook
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
