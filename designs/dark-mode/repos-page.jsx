import React, { useState } from 'react';
import {
  GitBranch,
  LayoutDashboard,
  CheckSquare,
  Zap,
  Link,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Eye,
  Zap as ZapIcon,
  Calendar,
  TrendingUp,
  Circle,
} from 'lucide-react';

export default function RepositoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: false },
    { icon: GitBranch, label: 'Repositories', active: true },
    { icon: CheckSquare, label: 'Test Cases', active: false },
    { icon: ZapIcon, label: 'Generations', active: false },
    { icon: Link, label: 'Integrations', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const repositories = [
    {
      id: 1,
      name: 'auth-service',
      org: 'acme-corp/auth-service',
      language: 'Python',
      languageColor: 'cyan',
      testCases: 87,
      lastScan: '2 hours ago',
      coverage: '94%',
      status: 'connected',
    },
    {
      id: 2,
      name: 'api-gateway',
      org: 'acme-corp/api-gateway',
      language: 'TypeScript',
      languageColor: 'violet',
      testCases: 142,
      lastScan: '4 hours ago',
      coverage: '88%',
      status: 'connected',
    },
    {
      id: 3,
      name: 'payment-processor',
      org: 'acme-corp/payment-processor',
      language: 'Go',
      languageColor: 'emerald',
      testCases: 64,
      lastScan: '1 day ago',
      coverage: '91%',
      status: 'connected',
    },
    {
      id: 4,
      name: 'notification-engine',
      org: 'acme-corp/notification-engine',
      language: 'Python',
      languageColor: 'cyan',
      testCases: 103,
      lastScan: '6 hours ago',
      coverage: '85%',
      status: 'scanning',
    },
    {
      id: 5,
      name: 'database-migrations',
      org: 'acme-corp/database-migrations',
      language: 'TypeScript',
      languageColor: 'violet',
      testCases: 31,
      lastScan: '3 days ago',
      coverage: '72%',
      status: 'connected',
    },
    {
      id: 6,
      name: 'analytics-worker',
      org: 'acme-corp/analytics-worker',
      language: 'Java',
      languageColor: 'amber',
      testCases: 156,
      lastScan: '12 hours ago',
      coverage: '89%',
      status: 'disconnected',
    },
  ];

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'connected':
        return (
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Connected</span>
          </div>
        );
      case 'scanning':
        return (
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-300">Scanning</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-slate-500 text-slate-500" />
            <span className="text-xs font-medium text-slate-400">Disconnected</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getLanguageBadge = (language, color) => {
    const colorMap = {
      cyan: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
      violet: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
      emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
      amber: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${colorMap[color]}`}>
        {language}
      </span>
    );
  };

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.org.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLanguage === 'all' || repo.language === filterLanguage;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <ZapIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-50">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors border-l-2 ${
                  item.active
                    ? 'bg-violet-500/10 text-violet-400 border-l-violet-500'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30 border-l-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Org Switcher */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/30 cursor-pointer hover:bg-slate-800/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-50 truncate">Acme Corp</p>
              <p className="text-xs text-slate-400 truncate">you@acme.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {/* Top Bar */}
        <div className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-slate-50">Repositories</h1>
          <div className="flex items-center gap-4">
            {/* Notification */}
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-400"></span>
            </button>
            {/* User Avatar */}
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white hover:opacity-80 transition-opacity">
              JD
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-2">Your Repositories</h2>
              <p className="text-slate-400">Manage repositories and generate test cases</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white font-medium hover:from-violet-600 hover:to-violet-700 transition-all hover:shadow-lg hover:shadow-violet-500/20">
              <Plus className="w-5 h-5" />
              Connect Repository
            </button>
          </div>

          {/* Search and Filter Row */}
          <div className="mb-6 flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
              />
            </div>
            {/* Language Filter */}
            <div className="relative">
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 appearance-none cursor-pointer pr-10"
              >
                <option value="all">All Languages</option>
                <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Go">Go</option>
                <option value="Java">Java</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all hover:shadow-lg hover:shadow-slate-900/30"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-slate-400" />
                      <h3 className="text-lg font-bold text-slate-50">{repo.name}</h3>
                    </div>
                    {getStatusIndicator(repo.status)}
                  </div>
                  <p className="text-sm text-slate-400">{repo.org}</p>
                </div>

                {/* Language Badge */}
                <div className="mb-4">
                  {getLanguageBadge(repo.language, repo.languageColor)}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Test Cases</p>
                    <p className="text-lg font-bold text-cyan-400">{repo.testCases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Coverage</p>
                    <p className="text-lg font-bold text-emerald-400">{repo.coverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Last Scan</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">{repo.lastScan}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-3 py-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-medium text-sm transition-colors border border-violet-500/30 hover:border-violet-500/50">
                    Generate Tests
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 font-medium text-sm transition-colors flex items-center justify-center gap-2 border border-slate-600/50">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRepos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <GitBranch className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">No repositories found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors">
                <Plus className="w-5 h-5" />
                Connect Repository
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
