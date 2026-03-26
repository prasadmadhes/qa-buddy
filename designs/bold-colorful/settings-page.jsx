'use client';

import React, { useState } from 'react';
import { Copy, Trash2, Plus, X } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(['functional', 'regression', 'edge-case']);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'members', label: 'Members' },
    { id: 'billing', label: 'Billing' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const members = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@acmecorp.com', role: 'Admin', joined: '2026-01-15', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', email: 'mike@acmecorp.com', role: 'Member', joined: '2026-02-03', avatar: 'MC' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa@acmecorp.com', role: 'Member', joined: '2026-02-20', avatar: 'LR' },
    { id: 4, name: 'David Park', email: 'david@acmecorp.com', role: 'Member', joined: '2026-03-01', avatar: 'DP' },
  ];

  const invoices = [
    { id: 1, date: '2026-03-01', amount: '$299', status: 'paid', description: 'Pro Plan - March 2026' },
    { id: 2, date: '2026-02-01', amount: '$299', status: 'paid', description: 'Pro Plan - February 2026' },
    { id: 3, date: '2026-01-01', amount: '$199', status: 'paid', description: 'Pro Plan - January 2026' },
    { id: 4, date: '2025-12-01', amount: '$199', status: 'pending', description: 'Pro Plan - December 2025' },
  ];

  const apiKeys = [
    { id: 1, name: 'Production API Key', key: 'qab_sk_prod_xxx...', created: '2026-01-15', lastUsed: '2026-03-26', active: true },
    { id: 2, name: 'Development Key', key: 'qab_sk_dev_xxx...', created: '2026-02-10', lastUsed: '2026-03-25', active: true },
  ];

  const categoryOptions = [
    { id: 'functional', label: 'Functional', color: 'from-purple-600 to-purple-400' },
    { id: 'regression', label: 'Regression', color: 'from-pink-600 to-pink-400' },
    { id: 'edge-case', label: 'Edge Case', color: 'from-orange-600 to-orange-400' },
    { id: 'smoke', label: 'Smoke', color: 'from-blue-600 to-blue-400' },
    { id: 'negative', label: 'Negative', color: 'from-cyan-600 to-cyan-400' },
  ];

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      <div className="px-8 pb-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-slate-200 bg-white rounded-t-2xl overflow-hidden">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-slate-900 border-b-transparent bg-slate-50 relative'
                  : 'text-slate-600 border-b-2 border-transparent hover:text-slate-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
              )}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Organization Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Organization Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="Acme Corp"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slug</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="acme-corp"
                      disabled
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                    />
                    <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Default Branch</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white">
                    <option>main</option>
                    <option>master</option>
                    <option>develop</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generation Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Generation Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Max Test Cases per Generation</label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Auto-Generate on New Commits</label>
                    <p className="text-xs text-slate-600 mt-1">Automatically trigger test generation when code is pushed</p>
                  </div>
                  <button
                    onClick={() => setAutoGenerate(!autoGenerate)}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      autoGenerate
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500'
                        : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${
                        autoGenerate ? 'translate-x-6' : ''
                      }`}
                    ></div>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Default Priority</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white">
                    <option>Medium</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Default Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          selectedCategories.includes(cat.id)
                            ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {selectedCategories.includes(cat.id) && '✓ '}
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl shadow-sm border-2 border-red-200 p-6">
              <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">Irreversible action. Delete this organization and all its data.</p>
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-colors flex items-center gap-2">
                <Trash2 size={18} />
                Delete Organization
              </button>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Team Members</h3>
                <p className="text-sm text-slate-600 mt-1">Manage team access and permissions</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Plus size={16} />
                Invite Member
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Member</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, idx) => (
                    <tr key={member.id} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center font-semibold text-sm">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select defaultValue={member.role} className="px-3 py-1.5 border border-purple-300 rounded-lg text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                          <option>Admin</option>
                          <option>Member</option>
                          <option>Viewer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{member.joined}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                          Remove
                        </button>
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
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-slate-900">Pro Plan</h3>
                    <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                      ✨ Current Plan
                    </div>
                  </div>
                  <p className="text-slate-600">Renews on April 1, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-900">$299</p>
                  <p className="text-sm text-slate-600">/month</p>
                </div>
              </div>
            </div>

            {/* Usage */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Test Cases Generated</span>
                    <span className="text-sm font-bold text-slate-900">743 / 1,000</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500" style={{ width: '74.3%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Connected Repositories</span>
                    <span className="text-sm font-bold text-slate-900">8 / 10</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                Upgrade to Enterprise
              </button>
            </div>

            {/* Invoices */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">Invoices</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, idx) => (
                    <tr key={invoice.id} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 text-sm text-slate-600">{invoice.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{invoice.description}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api-keys' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">API Keys</h3>
                <p className="text-sm text-slate-600 mt-1">Manage your API keys for programmatic access</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Plus size={16} />
                Create Key
              </button>
            </div>

            <div className="space-y-3">
              {apiKeys.map(key => (
                <div key={key.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{key.name}</h4>
                    <p className="text-sm text-slate-600 mt-1 font-mono">{key.key}</p>
                    <div className="flex gap-4 mt-3 text-xs text-slate-500">
                      <span>Created: {key.created}</span>
                      <span>Last used: {key.lastUsed}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${key.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Notification Preferences</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              {[
                { label: 'Generation completed', desc: 'Get notified when test generation finishes' },
                { label: 'Review request', desc: 'When new test cases are ready for review' },
                { label: 'Sync completed', desc: 'After test cases sync to your TCM tool' },
                { label: 'Sync failed', desc: 'When integration sync encounters errors' },
                { label: 'Team invitations', desc: 'When invited to join a team' },
              ].map((notif, idx) => (
                <div key={idx} className="flex items-start justify-between pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{notif.label}</p>
                    <p className="text-sm text-slate-600 mt-1">{notif.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-purple-600 mt-1" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Notification Channels</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="channel" defaultChecked className="w-4 h-4 accent-purple-600" />
                  <span className="text-slate-700">Email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="channel" className="w-4 h-4 accent-purple-600" />
                  <span className="text-slate-700">Slack notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="channel" className="w-4 h-4 accent-purple-600" />
                  <span className="text-slate-700">In-app only</span>
                </label>
              </div>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
