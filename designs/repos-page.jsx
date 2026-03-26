import React from 'react';
import {
  GitBranch,
  Clock,
  FileCode,
  CheckCircle,
  Plus,
  Search,
  Settings,
  BarChart3,
  Zap,
  TestTube,
  GitBranch as RepoIcon,
  ChevronDown,
} from 'lucide-react';

export default function RepositoriesPage() {
  const repos = [
    {
      id: 1,
      name: 'acme/web-app',
      language: 'TypeScript',
      languageColor: 'bg-blue-100 text-blue-800',
      lastScanned: '2 hours ago',
      testCases: 24,
      branch: 'main',
      active: true,
      filesAnalyzed: 142,
      coverage: 78,
    },
    {
      id: 2,
      name: 'acme/api-server',
      language: 'Python',
      languageColor: 'bg-green-100 text-green-800',
      lastScanned: '5 hours ago',
      testCases: 31,
      branch: 'main',
      active: true,
      filesAnalyzed: 87,
      coverage: 82,
    },
    {
      id: 3,
      name: 'acme/mobile-app',
      language: 'Swift',
      languageColor: 'bg-orange-100 text-orange-800',
      lastScanned: '1 day ago',
      testCases: 18,
      branch: 'master',
      active: true,
      filesAnalyzed: 156,
      coverage: 71,
    },
    {
      id: 4,
      name: 'acme/auth-service',
      language: 'Go',
      languageColor: 'bg-cyan-100 text-cyan-800',
      lastScanned: '3 days ago',
      testCases: 12,
      branch: 'main',
      active: false,
      filesAnalyzed: 64,
      coverage: 65,
    },
    {
      id: 5,
      name: 'acme/payment-gateway',
      language: 'Java',
      languageColor: 'bg-red-100 text-red-800',
      lastScanned: '4 hours ago',
      testCases: 28,
      branch: 'main',
      active: true,
      filesAnalyzed: 201,
      coverage: 85,
    },
    {
      id: 6,
      name: 'acme/admin-dashboard',
      language: 'TypeScript',
      languageColor: 'bg-blue-100 text-blue-800',
      lastScanned: '6 hours ago',
      testCases: 19,
      branch: 'main',
      active: true,
      filesAnalyzed: 119,
      coverage: 76,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={20} />
            </div>
            <span className="text-lg font-bold">QA Buddy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<BarChart3 size={20} />} label="Overview" />
          <NavItem
            icon={<RepoIcon size={20} />}
            label="Repositories"
            active
          />
          <NavItem icon={<TestTube size={20} />} label="Test Cases" />
          <NavItem icon={<Zap size={20} />} label="Generations" />
          <NavItem icon={<CheckCircle size={20} />} label="Integrations" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        {/* Org Switcher */}
        <div className="px-4 py-4 border-t border-slate-700">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
            <div className="text-left">
              <div className="text-sm font-semibold">Acme Corp</div>
              <div className="text-xs text-slate-400">Org</div>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Repositories</h1>
          </div>

          {/* Search and Action */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium">
              <Plus size={20} />
              Connect Repository
            </button>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="flex-1 overflow-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900 text-base">
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          repo.active ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded ${repo.languageColor}`}
                  >
                    {repo.language}
                  </span>
                </div>

                {/* Card Body */}
                <div className="px-6 py-4 flex-1">
                  {/* Metadata */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} />
                      <span>Scanned {repo.lastScanned}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <GitBranch size={16} />
                      <span>{repo.branch}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileCode size={16} />
                      <span>{repo.filesAnalyzed} files analyzed</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">
                        Test Cases
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        {repo.testCases}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">
                        Coverage
                      </div>
                      <div className="text-lg font-bold text-indigo-600">
                        {repo.coverage}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                    Generate Tests
                  </button>
                  <button className="px-3 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-slate-300 hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
