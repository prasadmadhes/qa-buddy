'use client';

import React, { useState } from 'react';
import {
  Settings,
  Users,
  CreditCard,
  Key,
  Bell,
  Copy,
  Trash2,
  Plus,
  Crown,
  ChevronDown,
  X,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [orgName, setOrgName] = useState('Acme Corp');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [maxTestCases, setMaxTestCases] = useState(50);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState('Medium');
  const [selectedCategories, setSelectedCategories] = useState([
    'Functional',
    'Regression',
    'Edge Case',
  ]);
  const [copied, setCopied] = useState(false);

  const categories = [
    'Functional',
    'Regression',
    'Edge Case',
    'Negative',
    'Boundary',
    'Smoke',
    'Integration',
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleCopySlug = () => {
    navigator.clipboard.writeText('acme-corp');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const members = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@acmecorp.com',
      role: 'Admin',
      joined: 'Jan 15, 2025',
      avatar: 'SC',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'marcus@acmecorp.com',
      role: 'Member',
      joined: 'Feb 3, 2025',
      avatar: 'MJ',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@acmecorp.com',
      role: 'Member',
      joined: 'Feb 20, 2025',
      avatar: 'EW',
    },
    {
      id: 4,
      name: 'David Lee',
      email: 'david@acmecorp.com',
      role: 'Member',
      joined: 'Mar 5, 2025',
      avatar: 'DL',
    },
  ];

  const invoices = [
    {
      id: 'INV-2025-003',
      date: 'Mar 1, 2025',
      amount: '$49.00',
      status: 'Paid',
    },
    {
      id: 'INV-2025-002',
      date: 'Feb 1, 2025',
      amount: '$49.00',
      status: 'Paid',
    },
    {
      id: 'INV-2025-001',
      date: 'Jan 1, 2025',
      amount: '$49.00',
      status: 'Paid',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-bold text-lg text-gray-900">QA Buddy</span>
          </div>

          <nav className="space-y-2">
            {[
              { name: 'Overview', href: '#' },
              { name: 'Repositories', href: '#' },
              { name: 'Test Cases', href: '#' },
              { name: 'Generations', href: '#' },
              { name: 'Integrations', href: '#' },
              { name: 'Analytics', href: '#' },
              { name: 'Settings', active: true },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex-1"></div>

        {/* Org Switcher */}
        <div className="p-6 border-t border-gray-200">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-600">
                AC
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Acme Corp</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            </div>
            <ChevronDown size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings size={32} className="text-indigo-600" />
              Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your organization settings and preferences
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'general', label: 'General', icon: Settings },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'billing', label: 'Billing', icon: CreditCard },
                { id: 'api-keys', label: 'API Keys', icon: Key },
                { id: 'notifications', label: 'Notifications', icon: Bell },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-8">
                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Organization Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Organization Slug
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="acme-corp"
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      <button
                        onClick={handleCopySlug}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Copy size={18} />
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Read-only. Used for API endpoints.
                    </p>
                  </div>

                  {/* Default Branch */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Default Branch
                    </label>
                    <select
                      value={defaultBranch}
                      onChange={(e) => setDefaultBranch(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option>main</option>
                      <option>master</option>
                      <option>develop</option>
                    </select>
                  </div>

                  <hr className="my-8" />

                  {/* Generation Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Generation Settings
                    </h3>

                    {/* Max Test Cases */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Max Test Cases Per Generation
                      </label>
                      <input
                        type="number"
                        value={maxTestCases}
                        onChange={(e) =>
                          setMaxTestCases(parseInt(e.target.value, 10))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        min="1"
                        max="500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Limits the number of test cases generated per run.
                      </p>
                    </div>

                    {/* Auto-generate on Push */}
                    <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Auto-generate on Push
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Automatically generate test cases when code is pushed
                        </p>
                      </div>
                      <button
                        onClick={() => setAutoGenerate(!autoGenerate)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          autoGenerate ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            autoGenerate ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Default Priority */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Default Priority
                      </label>
                      <select
                        value={defaultPriority}
                        onChange={(e) => setDefaultPriority(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>

                    {/* Default Categories */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Default Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              selectedCategories.includes(category)
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        These categories will be suggested when creating new
                        test cases.
                      </p>
                    </div>
                  </div>

                  <hr className="my-8" />

                  {/* Save Button */}
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                  </div>

                  <hr className="my-8" />

                  {/* Danger Zone */}
                  <div className="border-2 border-red-200 bg-red-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      Delete this organization and all associated data. This
                      action cannot be undone.
                    </p>
                    <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                      <Trash2 size={18} />
                      Delete Organization
                    </button>
                  </div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Team Members
                    </h2>
                    <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Plus size={18} />
                      Invite Member
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Name
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Email
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Role
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Joined
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member) => (
                          <tr key={member.id} className="border-b border-gray-100">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                                  {member.avatar}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {member.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {member.email}
                            </td>
                            <td className="px-6 py-4">
                              <select className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Admin</option>
                                <option>Member</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {member.joined}
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors">
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
                  {/* Current Plan Card */}
                  <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <Crown size={20} className="text-indigo-600" />
                          Pro Plan
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          $49 per month, billed monthly
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Usage Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Usage This Month
                    </h3>

                    <div className="space-y-6">
                      {/* Test Cases Usage */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Test Cases Generated
                          </label>
                          <span className="text-sm font-semibold text-gray-900">
                            743 / 1,000
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: '74.3%' }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          74.3% of monthly limit used
                        </p>
                      </div>

                      {/* Repositories Usage */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Connected Repositories
                          </label>
                          <span className="text-sm font-semibold text-gray-900">
                            8 / 10
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: '80%' }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          80% of repository limit used
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Crown size={18} />
                      Upgrade to Enterprise
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Manage Subscription
                    </button>
                  </div>

                  {/* Invoice History */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Invoice History
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                              Invoice ID
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                              Date
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                              Amount
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                              Status
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-gray-100">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {invoice.id}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {invoice.date}
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                {invoice.amount}
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                  {invoice.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                >
                                  Download
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* API Keys Tab - Preview */}
              {activeTab === 'api-keys' && (
                <div>
                  <p className="text-gray-600">API Keys tab content coming soon...</p>
                </div>
              )}

              {/* Notifications Tab - Preview */}
              {activeTab === 'notifications' && (
                <div>
                  <p className="text-gray-600">
                    Notifications tab content coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
