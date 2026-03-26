import React, { useState } from 'react';
import {
  Check,
  X,
  Zap,
  Shield,
  BarChart3,
  Users,
  Infinity,
  MessageSquare,
  Menu,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const monthlyPrice = (annual) => {
    if (annual) {
      return { free: 0, pro: 49, enterprise: null };
    }
    return { free: 0, pro: 59, enterprise: null };
  };

  const prices = monthlyPrice(isAnnual);
  const annualPrice = {
    pro: 589,
  };

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

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Choose the perfect plan for your team. Always transparent, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isAnnual
                  ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                isAnnual
                  ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Annual
              {isAnnual && (
                <span className="absolute -top-3 -right-6 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400" />
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 text-sm mb-6">Perfect for trying it out</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>

                <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 mb-8">
                  Get Started
                </button>

                <div className="space-y-4">
                  {[
                    'Up to 100 test cases/month',
                    '1 repository',
                    'Basic code analysis',
                    'Email support',
                    'Community access',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                  {['Analytics dashboard', 'TCM integrations', '24/7 support', 'SSO'].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative md:scale-105 md:z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-white rounded-2xl border-2 border-purple-100 overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300">
                <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400" />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-400 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <p className="text-gray-600 text-sm mb-6">For growing teams</p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isAnnual ? (annualPrice.pro / 12).toFixed(0) : prices.pro}
                    </span>
                    <span className="text-gray-600 ml-2">/month</span>
                    {isAnnual && (
                      <div className="text-sm text-gray-600 mt-2">
                        Billed ${annualPrice.pro}/year
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all duration-300 mb-8">
                    Start 14-Day Trial
                  </button>

                  <div className="space-y-4">
                    {[
                      'Unlimited test cases',
                      'Up to 10 repositories',
                      'AI-powered analysis',
                      'Human review workflow',
                      'Priority email support',
                      'TCM integrations (TestRail, Xray)',
                      'Custom categories',
                      'Team collaboration',
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white p-0.5 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                    {['24/7 phone support', 'Custom integrations', 'Dedicated account manager'].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 text-sm mb-6">For large organizations</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                  <p className="text-gray-600 text-sm mt-2">Contact sales for pricing</p>
                </div>

                <button className="w-full bg-blue-100 text-blue-600 py-3 rounded-full font-semibold hover:bg-blue-200 transition-all duration-300 mb-8">
                  Contact Sales
                </button>

                <div className="space-y-4">
                  {[
                    'Everything in Pro',
                    'Unlimited repositories',
                    'All TCM integrations',
                    'SSO & advanced security',
                    '24/7 priority support',
                    'Dedicated account manager',
                    'Custom SLA',
                    'Advanced analytics',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-center text-gray-600 text-sm">
                    Perfect for enterprise teams with custom needs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table Note */}
          <div className="mt-16 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-center text-gray-700">
              <span className="font-semibold">Need something custom?</span> All plans include a free 14-day trial and can be customized to fit your needs. {' '}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Talk to sales
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: 'Can I upgrade or downgrade my plan anytime?',
                answer: 'Yes! You can change your plan at any time. If you upgrade mid-month, we'll prorate your billing. Downgrading takes effect on your next billing cycle.',
                color: 'from-purple-100 to-purple-50',
              },
              {
                question: 'Do you offer a free trial?',
                answer: 'Absolutely! All paid plans come with a 14-day free trial. No credit card required. You get full access to all features during the trial period.',
                color: 'from-pink-100 to-pink-50',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers and wire payments for Enterprise customers.',
                color: 'from-orange-100 to-orange-50',
              },
              {
                question: 'Is there a commitment required?',
                answer: 'Nope! Monthly plans have no lock-in. You can cancel anytime. Annual plans offer a 20% discount and can be cancelled with 30 days notice.',
                color: 'from-blue-100 to-blue-50',
              },
              {
                question: 'What if I need more than 10 repos on the Pro plan?',
                answer: 'Great question! You can easily add additional repositories à la carte, or upgrade to Enterprise for unlimited repos. Contact our sales team for details.',
                color: 'from-cyan-100 to-cyan-50',
              },
              {
                question: 'Do you offer discounts for non-profits?',
                answer: 'Yes! We offer 50% off all plans for registered non-profit organizations. Email us with your non-profit documentation to claim your discount.',
                color: 'from-emerald-100 to-emerald-50',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${item.color} rounded-xl border border-gray-200 overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/30 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  )}
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-200/50 bg-white/40">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-purple-100 rounded-xl border-2 border-purple-300">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  Still have questions?
                </p>
                <p className="text-gray-700 mb-4">
                  Our support team is here to help! Reach out anytime.
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            No credit card required. 14-day free trial on all paid plans.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
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
