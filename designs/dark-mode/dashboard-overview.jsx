import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  CheckSquare,
  Zap,
  Link,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  Clock,
  AlertCircle,
  Zap as ZapIcon,
  Dot,
} from 'lucide-react';

export default function DashboardOverview() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: GitBranch, label: 'Repositories', active: false },
    { icon: CheckSquare, label: 'Test Cases', active: false },
    { icon: ZapIcon, label: 'Generations', active: false },
    { icon: Link, label: 'Integrations', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const stats = [
    { label: 'Total Test Cases', value: '2,847', accent: 'cyan-400' },
    { label: 'Pending Review', value: '124', accent: 'amber-400' },
    { label: 'Approval Rate', value: '87.3%', accent: 'emerald-400' },
    { label: 'Active Repos', value: '12', accent: 'violet-400' },
  ];

  const recentGenerations = [
    { repo: 'auth-service', files: 8, status: 'completed', testCases: 24, time: '2 hours ago' },
    { repo: 'api-gateway', files: 12, status: 'in_progress', testCases: 18, time: 'Currently running' },
    { repo: 'payment-processor', files: 5, status: 'completed', testCases: 19, time: '5 hours ago' },
    { repo: 'notification-engine', files: 10, status: 'completed', testCases: 31, time: '1 day ago' },
    { repo: 'database-migrations', files: 3, status: 'failed', testCases: 0, time: '2 days ago' },
  ];

  const activityFeed = [
    { type: 'generation', message: 'Test generation completed for auth-service', time: '2 hours ago', color: 'emerald' },
    { type: 'approval', message: 'You approved 12 test cases', time: '3 hours ago', color: 'violet' },
    { type: 'generation', message: 'Generation started for api-gateway', time: '4 hours ago', color: 'cyan' },
    { type: 'rejection', message: '3 test cases rejected for review', time: '6 hours ago', color: 'amber' },
    { type: 'sync', message: 'Synced 45 test cases to TestRail', time: '1 day ago', color: 'violet' },
  ];

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2.5 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-emerald-400/10 text-emerald-300 border border-emerald-400/20`}>Completed</span>;
      case 'in_progress':
        return <span className={`${baseClasses} bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 animate-pulse`}>In Progress</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-rose-400/10 text-rose-300 border border-rose-400/20`}>Failed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
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
          <h1 className="text-xl font-bold text-slate-50">Overview</h1>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search test cases, repos..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
              />
            </div>
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
        <div className="flex-1 overflow-auto p-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors"
                style={{
                  borderTop: `2px solid var(--color-${stat.accent})`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-50">{stat.value}</p>
                  </div>
                </div>
                <style>{`
                  .border-top-${stat.accent} { border-top-color: currentColor; }
                `}</style>
                <svg className="w-full h-8 mt-4 opacity-30" viewBox="0 0 100 30">
                  <polyline
                    points="0,20 10,15 20,18 30,10 40,12 50,8 60,14 70,6 80,16 90,10 100,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className={`text-${stat.accent}`}
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Recent Generations */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-50">Recent Generations</h2>
              <a href="#" className="text-sm text-violet-400 hover:text-violet-300">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Repository</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Files Scanned</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Cases</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {recentGenerations.map((gen, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-50 font-medium">{gen.repo}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{gen.files} files</td>
                      <td className="px-6 py-4 text-sm font-semibold text-cyan-400">{gen.testCases}</td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(gen.status)}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{gen.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Activity Feed</h2>
            <div className="space-y-3">
              {activityFeed.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-700/30 last:border-b-0 last:pb-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 bg-${activity.color}-400`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-50">{activity.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
