import React from 'react';

export default function LandingPage() {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ];

  const steps = [
    {
      number: 1,
      title: 'Connect Your Repo',
      description: 'Link your GitHub repository in seconds with our OAuth integration.',
      icon: '⚙️',
    },
    {
      number: 2,
      title: 'AI Analyzes Code',
      description: 'Our AI reads your code, understands the logic, and identifies test scenarios.',
      icon: '🧠',
    },
    {
      number: 3,
      title: 'Review & Approve',
      description: 'Human-in-the-loop: review, edit, or reject generated test cases.',
      icon: '✓',
    },
    {
      number: 4,
      title: 'Sync to Your TCM',
      description: 'Push approved tests to TestRail, Xray, Zephyr, or qTest automatically.',
      icon: '🔄',
    },
  ];

  const features = [
    {
      title: 'Language Agnostic',
      description: 'Works with Python, JavaScript, Java, Go, and more.',
      icon: '🌐',
    },
    {
      title: 'Smart Code Analysis',
      description: 'Detects endpoints, dependencies, edge cases, and coverage gaps.',
      icon: '🔍',
    },
    {
      title: 'TCM Integrations',
      description: 'TestRail, Xray, Zephyr, qTest, Azure Test Plans and more.',
      icon: '🔗',
    },
    {
      title: 'Cost Tracking',
      description: 'Monitor AI usage and costs per organization and repository.',
      icon: '💰',
    },
    {
      title: 'Bulk Actions',
      description: 'Approve, reject, or edit multiple test cases at once.',
      icon: '⚡',
    },
    {
      title: 'Real-time Sync',
      description: 'Approved tests automatically push to your test management system.',
      icon: '📡',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Test Cases Generated' },
    { number: '500+', label: 'Repos Connected' },
    { number: '95%', label: 'Approval Rate' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              QA Buddy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="px-6 py-2 rounded-lg font-medium text-sm text-slate-50 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40">
        {/* Decorative gradient blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-violet-500/10 rounded-full blur-3xl opacity-40 -top-24 left-1/2 transform -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your AI QA Engineer
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              that never sleeps
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            QA Buddy analyzes your code and automatically generates functional test cases. Review, approve, and sync to your test management tool in minutes, not days.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 rounded-lg font-semibold text-base bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-slate-50 transition-all shadow-lg shadow-violet-500/40 hover:shadow-violet-500/60 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-base text-slate-200 bg-white/5 backdrop-blur-md border border-white/10 hover:border-violet-500/30 hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-12 border-y border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-sm font-medium mb-8">
            Trusted by QA teams at leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Stripe', 'Vercel', 'Linear', 'Raycast', 'Figma'].map((company) => (
              <div
                key={company}
                className="px-6 py-3 rounded-lg bg-slate-800/30 border border-slate-700/30 text-slate-400 font-medium text-sm"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Get from code to comprehensive test cases in four simple steps
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative group bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/5 rounded-xl transition-all duration-300 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-6 text-lg font-bold text-white shadow-lg shadow-violet-500/30">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-slate-50">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Everything you need to generate, review, and manage test cases at scale
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-50">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-500/0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                  {stat.number}
                </div>
                <p className="text-slate-400 text-lg font-medium">
                  {stat.label}
                </p>
                <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-cyan-900/20 rounded-3xl"></div>
        <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-xl"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to automate your QA?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join engineering teams using QA Buddy to generate, review, and manage test cases faster than ever before.
          </p>

          <button className="px-10 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-slate-50 transition-all shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transform hover:scale-105 inline-block">
            Get Started Free
          </button>

          <p className="text-slate-500 text-sm mt-6">
            No credit card required. Start generating test cases in minutes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
                <span className="font-bold text-slate-50">QA Buddy</span>
              </div>
              <p className="text-slate-500 text-sm">
                AI-powered QA platform that generates test cases from your code.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-50 mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-50 mb-4">Developers</h4>
              <ul className="space-y-2">
                {['Documentation', 'API', 'SDK', 'GitHub'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-50 mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Privacy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2026 QA Buddy. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
