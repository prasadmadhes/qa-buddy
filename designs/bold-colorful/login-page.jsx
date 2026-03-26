import React, { useState } from 'react';
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Quote,
  Code2,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">
      {/* Left Side - Gradient Background with Testimonial */}
      <div className="hidden lg:flex lg:w-7/12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rotate-45 rounded-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-white">QA Buddy</span>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative z-10 max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <Quote className="w-8 h-8 text-purple-600 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-6">
              "Cut our QA testing time in half. QA Buddy is a game-changer for our team."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
              <div>
                <p className="font-bold text-gray-900">Sarah Chen</p>
                <p className="text-sm text-gray-600">QA Lead at Stripe</p>
              </div>
            </div>
          </div>

          {/* Floating Preview Cards */}
          <div className="mt-12 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <div>
                  <p className="text-white font-semibold text-sm">Generated 500+ tests</p>
                  <p className="text-white/70 text-xs">in 3 months</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-2 transition-transform duration-300 delay-100">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-amber-300" />
                <div>
                  <p className="text-white font-semibold text-sm">AI that understands</p>
                  <p className="text-white/70 text-xs">your codebase</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-2 transition-transform duration-300 delay-200">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-300" />
                <div>
                  <p className="text-white font-semibold text-sm">Human review first</p>
                  <p className="text-white/70 text-xs">100% quality controlled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="relative z-10">
          <p className="text-white/80 text-sm">
            Trusted by 500+ teams worldwide
          </p>
        </div>
      </section>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center px-6 sm:px-12 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              QA Buddy
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* GitHub OAuth Button */}
          <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 mb-6 shadow-md hover:shadow-lg">
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600 font-medium">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                Password
              </label>
              <a href="#" className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:bg-white transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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
          <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-300 mb-6">
            Sign In
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mb-8">
            Don't have an account?{' '}
            <a href="#" className="font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition">
              Sign up for free
            </a>
          </p>

          {/* Social Login Row */}
          <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 group">
              <svg className="w-6 h-6 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 group">
              <svg className="w-6 h-6 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 group">
              <svg className="w-6 h-6 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor" className="text-red-600">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-500 mt-8">
            By signing in, you agree to our{' '}
            <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
