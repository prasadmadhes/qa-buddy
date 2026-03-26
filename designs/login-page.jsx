import React, { useState } from 'react';
import { Github, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGithubLogin = () => {
    console.log('GitHub OAuth flow initiated');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in with email:', email);
  };

  return (
    <div className="h-screen flex">
      {/* Left Panel - Branding & Social Proof */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-900 text-white flex-col justify-between p-12">
        {/* Background gradient effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo and Branding */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">QA</span>
              </div>
              <h1 className="text-3xl font-bold">QA Buddy</h1>
            </div>
            <p className="text-indigo-300 text-lg font-medium">AI-powered test case generation from your codebase</p>
          </div>

          {/* Feature highlights (optional) */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Instant Coverage</h3>
                <p className="text-slate-400 text-sm">Generate functional test cases in minutes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Human Review First</h3>
                <p className="text-slate-400 text-sm">Every test case reviewed before shipping</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">TCM Integration</h3>
                <p className="text-slate-400 text-sm">Sync with TestRail, Xray, Zephyr & more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="relative z-10 border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm mb-4">Trusted by leading QA teams</p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-xs font-semibold text-white">A</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-xs font-semibold text-white">B</div>
              <div className="w-8 h-8 rounded-full bg-indigo-700 border-2 border-slate-900 flex items-center justify-center text-xs font-semibold text-white">C</div>
            </div>
            <span className="text-sm text-slate-400">500+ QA teams worldwide</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-7/12 bg-white flex flex-col items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QA</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">QA Buddy</h1>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Sign in to your account to continue</p>
          </div>

          {/* GitHub OAuth Button */}
          <button
            onClick={handleGithubLogin}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200 mb-6"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 text-sm mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign up
            </a>
          </p>

          {/* Terms */}
          <p className="text-center text-slate-500 text-xs mt-8">
            By signing in, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
