import React, { useState } from 'react';
import { Github } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-b from-slate-950 via-slate-950 to-violet-950/30 relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-4xl font-bold text-white mb-2">QA Buddy</div>
          <p className="text-slate-400">AI-powered test generation</p>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Ship tests faster with AI
          </h2>
          <p className="text-lg text-slate-300 mb-6 max-w-sm">
            Connect your repository. Let AI analyze your code. Review and approve test cases in minutes, not days.
          </p>

          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">✓</span>
              </div>
              <span>Automatic functional test generation</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">✓</span>
              </div>
              <span>Works with any language or framework</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">✓</span>
              </div>
              <span>Human-controlled review and approval</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-slate-400 text-sm">
          <p>Join 500+ teams improving their QA process</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle glow behind form */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-sm z-10">
          {/* Logo (mobile) */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-3xl font-bold text-white mb-1">QA Buddy</div>
            <p className="text-slate-400 text-sm">AI-powered test generation</p>
          </div>

          {/* Form Container */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400 mb-8">Sign in to your QA Buddy account</p>

            {/* GitHub Button */}
            <button className="w-full px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition border border-slate-600 text-white font-medium flex items-center justify-center gap-2 mb-6 group">
              <Github className="w-5 h-5 group-hover:scale-110 transition" />
              Continue with GitHub
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10"></div>
              <span className="text-slate-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-violet-500 checked:border-violet-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-violet-400 hover:text-violet-300 transition">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 disabled:opacity-50 transition font-semibold text-white shadow-lg shadow-violet-500/20 mt-6 relative group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition duration-300"></span>
                <span className="relative">{isLoading ? 'Signing in...' : 'Sign In'}</span>
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-violet-400 hover:text-violet-300 font-medium transition">
                  Sign up for free
                </a>
              </p>
            </div>

            {/* Social Proof / Additional Info */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-500 text-center mb-3">Trusted by teams at</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-xs font-semibold text-slate-500 bg-white/5 px-3 py-1 rounded border border-white/10">
                  Acme Co
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-white/5 px-3 py-1 rounded border border-white/10">
                  TechStart
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-white/5 px-3 py-1 rounded border border-white/10">
                  DevFlow
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-400 transition">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
