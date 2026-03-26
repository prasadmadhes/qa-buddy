import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate charges accordingly.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers for Enterprise customers.'
    },
    {
      question: 'Do you offer annual billing discounts?',
      answer: 'Yes! Annual plans receive a 20% discount. Contact our sales team for custom Enterprise pricing.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Pro plan includes a 14-day free trial with full access. Enterprise customers can request a custom trial period.'
    }
  ];

  const features = {
    free: [
      '1 repository',
      '50 test cases/month',
      'CSV export',
      'Community support'
    ],
    pro: [
      '10 repositories',
      '1,000 test cases/month',
      'TestRail + Xray sync',
      'Priority email support',
      'Coverage analytics',
      'Test case editing & bulk actions'
    ],
    enterprise: [
      'Unlimited repositories',
      'Unlimited test cases',
      'All TCM integrations',
      'SSO + SAML authentication',
      'Dedicated account manager',
      'Custom SLA & support'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded" />
            <span className="text-xl font-bold text-slate-900">QA Buddy</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-slate-900">Features</a>
            <a href="#" className="text-sm text-slate-900 font-medium">Pricing</a>
            <a href="#" className="text-sm text-gray-600 hover:text-slate-900">Docs</a>
            <button className="text-sm text-gray-600 hover:text-slate-900">Log in</button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4">
            Pricing
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start free. Scale as your team grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {/* Free Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
            <p className="text-sm text-gray-600 mb-6">For individuals exploring</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">$0</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <button className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 mb-8">
              Get Started
            </button>
            <div className="space-y-4 flex-1">
              {features.free.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Card (Featured) */}
          <div className="bg-slate-900 rounded-lg p-8 flex flex-col relative ring-2 ring-indigo-600 transform scale-105">
            <div className="absolute top-0 left-8 transform -translate-y-1/2">
              <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 mt-4">Pro</h3>
            <p className="text-sm text-gray-300 mb-6">For growing QA teams</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 mb-8">
              Start Free Trial
            </button>
            <div className="space-y-4 flex-1">
              {features.pro.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-sm text-gray-600 mb-6">For large organizations</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">Custom</span>
              <span className="text-gray-600 ml-2">pricing</span>
            </div>
            <button className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 mb-8">
              Contact Sales
            </button>
            <div className="space-y-4 flex-1">
              {features.enterprise.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-slate-900 text-left">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded" />
                <span className="font-bold text-white">QA Buddy</span>
              </div>
              <p className="text-sm text-gray-400">AI-powered QA for modern teams.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-400">
            <p>&copy; 2026 QA Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
