import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Brain,
  Rocket,
  TrendingUp,
  Users,
  Code2,
  BarChart3,
  Menu,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              QA Buddy
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">
              Pricing
            </a>
            <a href="#docs" className="text-gray-600 hover:text-gray-900 text-sm">
              Docs
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 text-sm hidden sm:block">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all duration-300">
              Get Started Free
            </button>
            <Menu className="w-5 h-5 md:hidden text-gray-600" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pt-32 pb-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-cyan-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-300 rotate-45 opacity-10 rounded-xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered QA<br />That Actually Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect your repo. AI analyzes your code. You review, approve, and ship test cases in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold border-2 border-white/40 hover:bg-white/30 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Dashboard preview card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="400" height="300" fill="url(#grid)" />
                  </svg>
                </div>
                <div className="relative text-center">
                  <BarChart3 className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-semibold">Test Case Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm font-semibold mb-8">
            TRUSTED BY 500+ QA TEAMS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['Stripe', 'Figma', 'GitHub', 'Vercel', 'Zapier', 'Notion'].map((company) => (
              <div key={company} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Three Simple Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 z-0" />

            {[
              { number: 1, title: 'Connect Repo', desc: 'Link your GitHub repo via OAuth', color: 'from-purple-600 to-purple-400' },
              { number: 2, title: 'AI Analyzes', desc: 'Claude reads your code and understands it', color: 'from-pink-600 to-pink-400' },
              { number: 3, title: 'Review & Ship', desc: 'Approve test cases and sync to your TCM', color: 'from-orange-600 to-orange-400' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="relative z-10 bg-white">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-purple-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 text-center mb-16">
            Everything you need to revolutionize your QA process
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI-Powered Analysis', desc: 'Claude understands your code deeply', color: 'from-purple-600 to-purple-400' },
              { icon: CheckCircle2, title: 'Human Review First', desc: 'Every test case reviewed before syncing', color: 'from-pink-600 to-pink-400' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Generate tests in minutes, not days', color: 'from-orange-600 to-orange-400' },
              { icon: Shield, title: 'Enterprise Secure', desc: 'Encrypted credentials, SOC 2 ready', color: 'from-blue-600 to-blue-400' },
              { icon: Code2, title: 'Multi-Language', desc: 'Python, JS, Java, Go, and more', color: 'from-cyan-600 to-cyan-400' },
              { icon: TrendingUp, title: 'Analytics Ready', desc: 'Track coverage and approval rates', color: 'from-emerald-600 to-emerald-400' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Tests Generated' },
              { number: '500+', label: 'Teams Using QA Buddy' },
              { number: '95%', label: 'Approval Rate' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-white/80 text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Loved by QA Teams
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'Cut our test writing time by 80%.', author: 'Sarah Chen', role: 'QA Lead at Stripe', color: 'from-purple-400 to-pink-400' },
              { quote: 'Finally, QA that scales with our velocity.', author: 'Marcus Rodriguez', role: 'Engineering Manager at Figma', color: 'from-pink-400 to-orange-400' },
              { quote: 'Best investment in our QA pipeline ever.', author: 'Priya Patel', role: 'QA Director at GitHub', color: 'from-blue-400 to-cyan-400' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-amber-400">★</div>
                  ))}
                </div>
                <p className="text-gray-900 font-semibold mb-6 text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex-shrink-0`} />
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to automate your QA?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start generating test cases today. No credit card required.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 border-t-4 border-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded" />
                <span className="font-bold">QA Buddy</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered QA platform for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 QA Buddy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
