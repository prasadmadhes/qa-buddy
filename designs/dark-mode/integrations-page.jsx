import React, { useState } from 'react';
import {
  Sidebar,
  LayoutDashboard,
  FileText,
  Zap,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  Settings2,
  Trash2,
  Plus,
} from 'lucide-react';

const IntegrationsPage = () => {
  const [expandedSync, setExpandedSync] = useState(null);

  // Connected integrations
  const connectedIntegrations = [
    {
      id: 'testrail',
      name: 'TestRail',
      status: 'connected',
      lastSync: '2h ago',
      syncCount: 247,
      color: 'emerald',
      lastSyncs: [
        { id: 1, date: '2h ago', status: 'success', testCases: 12 },
        { id: 2, date: '4h ago', status: 'success', testCases: 8 },
        { id: 3, date: '1d ago', status: 'success', testCases: 15 },
        { id: 4, date: '2d ago', status: 'success', testCases: 9 },
        { id: 5, date: '3d ago', status: 'failed', testCases: 0 },
      ],
    },
    {
      id: 'xray',
      name: 'Xray for Jira',
      status: 'connected',
      lastSync: '6h ago',
      syncCount: 189,
      color: 'emerald',
      lastSyncs: [
        { id: 1, date: '6h ago', status: 'success', testCases: 7 },
        { id: 2, date: '1d ago', status: 'success', testCases: 11 },
        { id: 3, date: '2d ago', status: 'success', testCases: 6 },
        { id: 4, date: '3d ago', status: 'success', testCases: 10 },
        { id: 5, date: '4d ago', status: 'success', testCases: 8 },
      ],
    },
  ];

  // Available integrations
  const availableIntegrations = [
    { id: 'zephyr', name: 'Zephyr Scale' },
    { id: 'qtest', name: 'qTest' },
    { id: 'azure', name: 'Azure Test Plans' },
  ];

  const SyncHistoryRow = ({ sync, status }) => (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-700/30 transition-colors">
      <div className="flex items-center gap-3">
        {status === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <AlertCircle className="w-4 h-4 text-rose-400" />
        )}
        <span className="text-sm text-slate-400">{sync.date}</span>
      </div>
      <span className="text-sm text-slate-50">{sync.testCases} test cases</span>
    </div>
  );

  const IntegrationCard = ({ integration, isAvailable = false }) => (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-600 rounded" />
          </div>
          <div>
            <h3 className="text-slate-50 font-semibold">{integration.name}</h3>
            {!isAvailable && (
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full bg-${integration.color}-400`} />
                <span className="text-xs text-slate-400">Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isAvailable && (
        <div className="space-y-3 mb-4 pb-4 border-b border-slate-700/30">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Last synced</span>
            <span className="text-slate-50">{integration.lastSync}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total synced</span>
            <span className="text-slate-50">{integration.syncCount} test cases</span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {isAvailable ? (
          <button className="flex-1 px-4 py-2 rounded-lg border border-violet-500/50 text-violet-400 text-sm font-medium hover:bg-violet-500/10 transition-colors">
            <Plus className="w-4 h-4 inline mr-2" />
            Connect
          </button>
        ) : (
          <>
            <button className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 text-slate-50 text-sm font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
              <Settings2 className="w-4 h-4" />
              Configure
            </button>
            <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-400 text-sm font-medium hover:bg-slate-700/30 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-slate-50 font-bold text-lg">QA Buddy</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Repos</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Zap className="w-5 h-5" />
            <span>Test Cases</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 text-violet-400 transition-colors">
            <Settings2 className="w-5 h-5" />
            <span>Integrations</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Integrations</h2>
            <p className="text-slate-400">Connect and manage your test case management tools</p>
          </div>

          {/* Connected Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Connected</h3>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {connectedIntegrations.map((integration) => (
                <div key={integration.id}>
                  <IntegrationCard integration={integration} />

                  {/* Sync History */}
                  <button
                    onClick={() => setExpandedSync(expandedSync === integration.id ? null : integration.id)}
                    className="mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    {expandedSync === integration.id ? 'Hide' : 'Show'} sync history
                  </button>

                  {expandedSync === integration.id && (
                    <div className="mt-3 bg-slate-800/30 border border-slate-700/30 rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/30">
                        <h4 className="text-sm font-semibold text-slate-50">Last 5 syncs</h4>
                      </div>
                      <div className="divide-y divide-slate-700/30">
                        {integration.lastSyncs.map((sync) => (
                          <SyncHistoryRow key={sync.id} sync={sync} status={sync.status} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Available</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableIntegrations.map((integration) => (
                <IntegrationCard key={integration.id} integration={integration} isAvailable />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
