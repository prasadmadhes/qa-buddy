import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Zap,
  Code,
  Settings,
} from 'lucide-react';

export default function GenerationsPage() {
  const [selectedGeneration, setSelectedGeneration] = useState('gen-003');
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    setAnimateProgress(true);
  }, []);

  const generations = [
    {
      id: 'gen-001',
      repo: 'auth-service',
      scope: 'Repository',
      files: 24,
      testCases: 156,
      status: 'completed',
      duration: '4m 32s',
      tokens: 145230,
      date: '2026-03-26T14:32:00Z',
      completedAt: '2026-03-26 14:32:00',
    },
    {
      id: 'gen-002',
      repo: 'api-gateway',
      scope: 'Module: payment',
      files: 8,
      testCases: 42,
      status: 'completed',
      duration: '2m 15s',
      tokens: 67890,
      date: '2026-03-26T13:15:00Z',
      completedAt: '2026-03-26 13:15:00',
    },
    {
      id: 'gen-003',
      repo: 'data-processor',
      scope: 'Repository',
      files: 31,
      testCases: 203,
      status: 'running',
      duration: '3m 22s',
      tokens: 187450,
      date: '2026-03-26T15:45:00Z',
      progress: {
        'Code Fetching': { status: 'completed', icon: CheckCircle2 },
        'Analyzing': { status: 'completed', icon: CheckCircle2 },
        'Generating': { status: 'running', icon: Play },
        'Storing': { status: 'pending', icon: Clock },
      },
      estimatedTime: '1m 45s',
      currentTokens: 187450,
      filesAnalyzed: 31,
      testCasesGenerated: 203,
    },
    {
      id: 'gen-004',
      repo: 'web-dashboard',
      scope: 'Files',
      files: 12,
      testCases: 89,
      status: 'completed',
      duration: '3m 8s',
      tokens: 92340,
      date: '2026-03-26T12:30:00Z',
      completedAt: '2026-03-26 12:30:00',
    },
    {
      id: 'gen-005',
      repo: 'notification-service',
      scope: 'Repository',
      files: 15,
      testCases: 67,
      status: 'failed',
      duration: '1m 5s',
      tokens: 32100,
      date: '2026-03-26T11:20:00Z',
      error: 'Rate limit exceeded. Retry after 5 minutes.',
    },
    {
      id: 'gen-006',
      repo: 'search-engine',
      scope: 'Module: indexing',
      files: 19,
      testCases: 134,
      status: 'completed',
      duration: '5m 12s',
      tokens: 156780,
      date: '2026-03-26T10:05:00Z',
      completedAt: '2026-03-26 10:05:00',
    },
    {
      id: 'gen-007',
      repo: 'cache-layer',
      scope: 'Repository',
      files: 7,
      testCases: 38,
      status: 'queued',
      duration: '-',
      tokens: 0,
      date: '2026-03-26T16:10:00Z',
      position: 1,
    },
    {
      id: 'gen-008',
      repo: 'monitoring-service',
      scope: 'Files',
      files: 6,
      testCases: 28,
      status: 'completed',
      duration: '1m 45s',
      tokens: 41230,
      date: '2026-03-26T09:30:00Z',
      completedAt: '2026-03-26 09:30:00',
    },
  ];

  const stats = [
    { label: 'Total Generations', value: '347', suffix: '' },
    { label: 'Running Now', value: '2', suffix: '' },
    { label: 'Avg Test Cases/Gen', value: '23.4', suffix: '' },
    { label: 'Total Tokens Used', value: '2.4M', suffix: '' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'Completed',
        icon: CheckCircle2,
      },
      running: {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        label: 'Running',
        icon: Play,
      },
      failed: {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        label: 'Failed',
        icon: AlertCircle,
      },
      queued: {
        bg: 'bg-slate-700/50',
        text: 'text-slate-400',
        border: 'border-slate-600/50',
        label: 'Queued',
        icon: Clock,
      },
    };
    return styles[status] || styles.completed;
  };

  const formatTokens = (tokens) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + 'M';
    }
    if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + 'K';
    }
    return tokens.toString();
  };

  const selectedGen = generations.find((g) => g.id === selectedGeneration);
  const statusBadge = getStatusBadge(selectedGen?.status);

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col p-6">
        <div className="mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            QA Buddy
          </div>
          <div className="text-xs text-slate-400 mt-1">Test Intelligence Platform</div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { icon: '📊', label: 'Overview', active: false },
            { icon: '📁', label: 'Repositories', active: false },
            { icon: '✓', label: 'Test Cases', active: false },
            { icon: '⚡', label: 'Generations', active: true },
            { icon: '🔗', label: 'Integrations', active: false },
            { icon: '📈', label: 'Analytics', active: false },
            { icon: '⚙️', label: 'Settings', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-all ${
                item.active
                  ? 'bg-slate-800 text-violet-400 border-l-2 border-violet-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-700/50 space-y-3">
          <button className="w-full px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition">
            Docs
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition">
            Support
          </button>
          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
              <div className="text-xs">
                <div className="text-slate-200 font-medium">Sarah Chen</div>
                <div className="text-slate-500">Engineering Org</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/50 border-b border-slate-700/50 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-50">Generations</h1>
              <p className="text-slate-400 mt-1">Track and monitor test case generation jobs</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/20 transition flex items-center gap-2">
              <Zap className="w-4 h-4" />
              New Generation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-slate-50 text-2xl font-bold">
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-slate-400 ml-1">{stat.suffix}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex gap-6 p-8">
          {/* Table Section */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead className="bg-slate-900/50 sticky top-0">
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Repository</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Scope</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-semibold">Files</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-semibold">Test Cases</th>
                    <th className="text-center px-4 py-3 text-slate-400 font-semibold">Status</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-semibold">Duration</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-semibold">Tokens</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {generations.map((gen) => {
                    const badge = getStatusBadge(gen.status);
                    const Icon = badge.icon;

                    return (
                      <tr
                        key={gen.id}
                        onClick={() => setSelectedGeneration(gen.id)}
                        className={`cursor-pointer transition ${
                          selectedGeneration === gen.id
                            ? 'bg-violet-500/15 border-l-2 border-l-violet-500'
                            : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="px-4 py-3 text-slate-50 font-medium">{gen.repo}</td>
                        <td className="px-4 py-3 text-slate-400">{gen.scope}</td>
                        <td className="px-4 py-3 text-right text-slate-400">{gen.files}</td>
                        <td className="px-4 py-3 text-right text-slate-400">{gen.testCases}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {gen.status === 'running' && animateProgress && (
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            )}
                            <Icon className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-400 font-mono">{gen.duration}</td>
                        <td className="px-4 py-3 text-right text-slate-400 font-mono">{formatTokens(gen.tokens)}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                          {new Date(gen.date).toLocaleDateString()} {new Date(gen.date).toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          {selectedGen && (
            <div className="w-96 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 flex flex-col">
              <h2 className="text-lg font-bold text-slate-50 mb-1">{selectedGen.repo}</h2>
              <p className="text-xs text-slate-400 mb-6">{selectedGen.scope}</p>

              {selectedGen.status === 'running' && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Progress
                  </h3>

                  {Object.entries(selectedGen.progress).map(([step, info], idx) => {
                    const isCompleted = info.status === 'completed';
                    const isRunning = info.status === 'running';
                    const isPending = info.status === 'pending';
                    const Icon = info.icon;

                    return (
                      <div key={step}>
                        <div className="flex items-center gap-3 mb-1">
                          {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {isRunning && (
                            <div className="relative w-4 h-4">
                              <div className="absolute inset-0 rounded-full border-2 border-slate-600 border-t-cyan-400 animate-spin" />
                            </div>
                          )}
                          {isPending && <Clock className="w-4 h-4 text-slate-500" />}
                          <span className={`text-sm font-medium ${
                            isCompleted ? 'text-emerald-400' : isRunning ? 'text-cyan-400' : 'text-slate-500'
                          }`}>
                            {step}
                          </span>
                        </div>
                        {idx < Object.entries(selectedGen.progress).length - 1 && (
                          <div className="ml-1.5 w-0.5 h-6 bg-slate-700/50" />
                        )}
                      </div>
                    );
                  })}

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-slate-400 mb-1">Files Analyzed</p>
                        <p className="text-cyan-400 font-semibold">{selectedGen.filesAnalyzed}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Test Cases</p>
                        <p className="text-cyan-400 font-semibold">{selectedGen.testCasesGenerated}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Tokens Used</p>
                        <p className="text-cyan-400 font-semibold font-mono">{formatTokens(selectedGen.currentTokens)}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Est. Time Left</p>
                        <p className="text-cyan-400 font-semibold">{selectedGen.estimatedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedGen.status === 'completed' && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div className="text-sm">
                      <p className="text-emerald-400 font-semibold">Generation Complete</p>
                      <p className="text-emerald-400/70 text-xs">{selectedGen.completedAt}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                      <p className="text-slate-400 mb-1">Duration</p>
                      <p className="text-slate-50 font-semibold">{selectedGen.duration}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                      <p className="text-slate-400 mb-1">Total Tokens</p>
                      <p className="text-slate-50 font-semibold font-mono">{formatTokens(selectedGen.tokens)}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGen.status === 'failed' && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-rose-400 font-semibold">Generation Failed</p>
                      <p className="text-rose-400/70 text-xs mt-1">{selectedGen.error}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGen.status === 'queued' && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div className="text-sm">
                      <p className="text-slate-300 font-semibold">Queued</p>
                      <p className="text-slate-400 text-xs">Position #{selectedGen.position}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-700/50 space-y-2 mt-auto">
                <button className="w-full px-4 py-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 text-sm font-medium transition flex items-center justify-center gap-2">
                  <Code className="w-4 h-4" />
                  View Code
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 text-sm font-medium transition flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
