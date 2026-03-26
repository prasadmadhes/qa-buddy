'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Zap,
  GitBranch,
  Play,
  Plus,
  Bell,
  Search,
  Sparkles,
  Github,
} from 'lucide-react';

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      label: 'Total Test Cases',
      value: '2,847',
      trend: '+124',
      positive: true,
      icon: CheckCircle2,
      accentColor: 'purple',
      bgColor: 'bg-purple-100',
      borderColor: 'border-l-4 border-purple-600',
      textColor: 'text-purple-600',
    },
    {
      label: 'Pending Review',
      value: '124',
      trend: '+12',
      positive: false,
      icon: Clock,
      accentColor: 'orange',
      bgColor: 'bg-orange-100',
      borderColor: 'border-l-4 border-orange-400',
      textColor: 'text-orange-400',
    },
    {
      label: 'Approval Rate',
      value: '87.3%',
      trend: '+2.1%',
      positive: true,
      icon: Zap,
      accentColor: 'emerald',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-l-4 border-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      label: 'Active Repos',
      value: '12',
      trend: '+1',
      positive: true,
      icon: GitBranch,
      accentColor: 'blue',
      bgColor: 'bg-blue-100',
      borderColor: 'border-l-4 border-blue-600',
      textColor: 'text-blue-600',
    },
  ];

  const generations = [
    {
      repo: 'nextjs-ecommerce',
      scope: 'pages/checkout',
      tests: 18,
      status: 'completed',
      date: '2 hours ago',
    },
    {
      repo: 'api-auth-service',
      scope: 'Full repo',
      tests: 42,
      status: 'in-progress',
      date: '45 min ago',
    },
    {
      repo: 'react-components',
      scope: 'src/Button',
      tests: 8,
      status: 'pending',
      date: 'Just now',
    },
  ];

  const activity = [
    { type: 'approved', user: 'You', action: 'approved 5 test cases', time: '2 minutes ago' },
    { type: 'generated', user: 'AI', action: 'generated 18 test cases for checkout flow', time: '2 hours ago' },
    { type: 'connected', user: 'Sarah Chen', action: 'connected TestRail integration', time: '1 day ago' },
    { type: 'rejected', user: 'You', action: 'rejected 2 test cases with feedback', time: '2 days ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'pending':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'approved':
        return 'bg-emerald-500';
      case 'generated':
        return 'bg-purple-500';
      case 'connected':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-8 py-12 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-lg text-white/80 mb-6">You have 124 test cases pending review</p>
          <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:shadow-lg transition-shadow">
            Review Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const TrendIcon = stat.positive ? TrendingUp : TrendingDown;
            return (
              <div key={idx} className={`bg-white rounded-lg p-6 shadow-sm ${stat.borderColor}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon className={`w-4 h-4 ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-semibold ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-gray-500">this month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Recent Generations */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Gradient header strip */}
              <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400" />

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Generations</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Repo</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Scope</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tests</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generations.map((gen, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-4 px-4 text-sm font-medium text-gray-900">{gen.repo}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{gen.scope}</td>
                          <td className="py-4 px-4 text-sm font-semibold text-gray-900">{gen.tests}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(gen.status)}`}>
                              {gen.status === 'completed' && '✓ Completed'}
                              {gen.status === 'in-progress' && '⟳ In Progress'}
                              {gen.status === 'pending' && '⏱ Pending'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">{gen.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Feed</h2>
            <div className="space-y-4">
              {activity.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getActivityColor(item.type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: Sparkles, label: 'New Generation', color: 'purple' },
              { icon: CheckCircle2, label: 'Review Queue', color: 'pink' },
              { icon: Github, label: 'Connect Repo', color: 'blue' },
            ].map((action, idx) => {
              const Icon = action.icon;
              const borderColor = {
                purple: 'border-purple-300',
                pink: 'border-pink-300',
                blue: 'border-blue-300',
              }[action.color];
              const iconColor = {
                purple: 'text-purple-600',
                pink: 'text-pink-500',
                blue: 'text-blue-600',
              }[action.color];

              return (
                <div key={idx} className={`bg-white border-2 ${borderColor} border-dashed rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer`}>
                  <Icon className={`w-8 h-8 ${iconColor} mx-auto mb-3`} />
                  <p className="font-semibold text-gray-900">{action.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
