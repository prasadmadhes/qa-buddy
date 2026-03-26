import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Zap,
  Settings,
  LogOut,
  Eye,
  Settings2,
  Save,
  AlertTriangle,
  Trash2,
  Plus,
  Copy,
  Eye as EyeIcon,
  EyeOff,
  ChevronRight,
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [orgName, setOrgName] = useState('Acme Corp');
  const [orgSlug, setOrgSlug] = useState('acme-corp');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [maxTestCases, setMaxTestCases] = useState('100');
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [defaultPriority, setDefaultPriority] = useState('high');
  const [showApiKey, setShowApiKey] = useState(false);

  const apiKey = 'qab_live_8kZfA9mL2xK4pQ7vN5jB6wC3hD1rE0sT';
  const apiKeyMasked = 'qab_live_••••••••••••••••';

  // Mock members data
  const members = [
    { id: 1, name: 'Alice Johnson', email: 'alice@acme.com', role: 'admin', joinedAt: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@acme.com', role: 'member', joinedAt: '2024-02-01' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@acme.com', role: 'member', joinedAt: '2024-02-15' },
  ];

  // Mock billing data
  const currentPlan = {
    name: 'Professional',
    price: '$99/month',
    features: ['Unlimited repositories', 'AI test case generation', 'TCM integrations', '24/7 support'],
  };

  const usage = {
    generationsUsed: 147,
    generationsLimit: 200,
    apiCallsUsed: 8924,
    apiCallsLimit: 10000,
  };

  const invoices = [
    { id: 'INV-2024-03', date: 'Mar 1, 2024', amount: '$99.00', status: 'paid' },
    { id: 'INV-2024-02', date: 'Feb 1, 2024', amount: '$99.00', status: 'paid' },
    { id: 'INV-2024-01', date: 'Jan 1, 2024', amount: '$99.00', status: 'paid' },
  ];

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'members', label: 'Members' },
    { id: 'billing', label: 'Billing' },
    { id: 'api', label: 'API Keys' },
  ];

  const ProgressBar = ({ used, limit }) => {
    const percentage = (used / limit) * 100;
    return (
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-400">{used} / {limit}</span>
          <span className="text-sm text-slate-50 font-medium">{Math.round(percentage)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

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
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Settings2 className="w-5 h-5" />
            <span>Integrations</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 text-violet-400 transition-colors">
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
      <div className="flex-1 overflow-auto bg-slate-950">
        <div className="p-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Settings</h2>
            <p className="text-slate-400">Manage your organization and account preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-800 mb-8">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-4 font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'text-violet-400 border-b-violet-500'
                      : 'text-slate-400 border-b-transparent hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-8">
              {/* Organization Settings */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-50 mb-6">Organization Settings</h3>

                <div className="space-y-6">
                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors outline-none"
                    />
                  </div>

                  {/* Organization Slug */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">Organization Slug</label>
                    <input
                      type="text"
                      value={orgSlug}
                      onChange={(e) => setOrgSlug(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors outline-none"
                    />
                    <p className="text-xs text-slate-500 mt-1">Used in URLs: qa-buddy.io/org/{orgSlug}</p>
                  </div>

                  {/* Default Branch */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">Default Branch</label>
                    <input
                      type="text"
                      value={defaultBranch}
                      onChange={(e) => setDefaultBranch(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Generation Settings */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-50 mb-6">Generation Settings</h3>

                <div className="space-y-6">
                  {/* Max Test Cases */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">Max Test Cases per Generation</label>
                    <input
                      type="number"
                      value={maxTestCases}
                      onChange={(e) => setMaxTestCases(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors outline-none"
                    />
                  </div>

                  {/* Auto-Generate Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-50">Auto-generate on new commits</p>
                      <p className="text-xs text-slate-400 mt-1">Automatically trigger test case generation when code is pushed</p>
                    </div>
                    <button
                      onClick={() => setAutoGenerate(!autoGenerate)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoGenerate ? 'bg-violet-600' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoGenerate ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Default Priority */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">Default Priority</label>
                    <select
                      value={defaultPriority}
                      onChange={(e) => setDefaultPriority(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors outline-none cursor-pointer"
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-lg font-medium hover:from-violet-700 hover:to-violet-600 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-rose-950/30 border border-rose-500/20 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </h3>
                <p className="text-sm text-slate-400 mb-4">Deleting an organization is permanent and cannot be undone.</p>
                <button className="px-6 py-2 bg-rose-600/20 border border-rose-500/50 text-rose-400 rounded-lg font-medium hover:bg-rose-600/30 transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Organization
                </button>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex justify-end mb-6">
                <button className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Invite Member
                </button>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/30">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, idx) => (
                      <tr key={member.id} className={`border-b border-slate-700/30 ${idx !== members.length - 1 ? '' : ''}`}>
                        <td className="px-6 py-4 text-sm text-slate-50 font-medium">{member.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{member.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            defaultValue={member.role}
                            className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-slate-50 text-sm outline-none cursor-pointer"
                          >
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{member.joinedAt}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-rose-400 hover:text-rose-300 transition-colors">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-8">
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-violet-600/20 to-violet-600/5 border border-violet-500/30 rounded-lg p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-50">{currentPlan.name}</h3>
                    <p className="text-3xl font-bold text-violet-400 mt-2">{currentPlan.price}</p>
                  </div>
                  <button className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                    Upgrade
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <p className="text-sm text-slate-50">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-50 mb-6">Usage This Month</h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-slate-50 mb-3">Test Case Generations</p>
                    <ProgressBar used={usage.generationsUsed} limit={usage.generationsLimit} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-50 mb-3">API Calls</p>
                    <ProgressBar used={usage.apiCallsUsed} limit={usage.apiCallsLimit} />
                  </div>
                </div>
              </div>

              {/* Invoices */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-slate-50">Billing History</h3>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Invoice</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, idx) => (
                      <tr key={invoice.id} className="border-b border-slate-700/30 hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-50 font-medium">{invoice.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{invoice.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-50 font-medium">{invoice.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <button className="text-violet-400 hover:text-violet-300 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <p className="text-slate-400">API keys allow you to authenticate requests to the QA Buddy API.</p>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-50">Live Key</p>
                    <p className="text-xs text-slate-500 mt-1">Created Jan 15, 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded p-3 font-mono text-sm text-slate-50 break-all">
                  {showApiKey ? apiKey : apiKeyMasked}
                </div>
              </div>

              <button className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                Generate New Key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
