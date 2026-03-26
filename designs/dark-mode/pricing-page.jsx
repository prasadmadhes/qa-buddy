import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const pricingTiers = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 repositories',
        'Basic code analysis',
        'Manual test case review',
        '500 test cases/month',
        'Email support',
        'Community forum access',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: 49,
      description: 'For growing teams and projects',
      features: [
        'Unlimited repositories',
        'Advanced code analysis',
        'Automated test categorization',
        '10,000 test cases/month',
        'Priority email & chat support',
        'TCM integrations (TestRail, Xray, Zephyr)',
        'Team collaboration features',
        'Custom test case templates',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: null,
      description: 'Custom solutions for large organizations',
      features: [
        'Everything in Pro',
        'Unlimited test cases',
        'Dedicated support & onboarding',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security & compliance',
        'Dedicated account manager',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers for Enterprise customers.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Absolutely! Start with our Free plan and upgrade whenever you're ready. No credit card required to get started.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer:
        'Yes, we offer 20% off when you commit to annual billing. Contact our sales team to discuss custom pricing for Enterprise plans.',
    },
    {
      question: 'What happens if I exceed my monthly limit?',
      answer:
        'We'll notify you when you're approaching your limit. You can upgrade anytime, and overages are handled gracefully—we won't cut off service.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">QA Buddy</div>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-slate-400 hover:text-slate-50 transition">
              Docs
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-50 transition">
              Pricing
            </a>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-50 hover:bg-white/10 transition">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-20 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-violet-400/20 mb-6">
            <span className="text-violet-400 text-sm font-medium">PRICING</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, transparent pricing
          </h1>

          <p className="text-xl text-slate-400 mb-2">
            Pay only for what you need. Scale as your team grows.
          </p>
          <p className="text-slate-500">No hidden fees, cancel anytime.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div key={idx} className="relative group">
              {/* Glow effect for Pro tier */}
              {tier.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition duration-500 -z-10"></div>
              )}

              <div
                className={`relative rounded-2xl backdrop-blur-xl transition duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/50 border-2 border-violet-500'
                    : 'bg-white/5 border border-white/10'
                } p-8 h-full flex flex-col hover:bg-white/10`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{tier.description}</p>

                  {tier.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">${tier.price}</span>
                      <span className="text-slate-400">/month</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white">Custom pricing</div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8 flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                {tier.name === 'Enterprise' ? (
                  <button className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition font-medium">
                    Contact Sales
                  </button>
                ) : tier.popular ? (
                  <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 transition font-semibold shadow-lg shadow-violet-500/20 relative group/btn overflow-hidden">
                    <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition duration-300"></span>
                    <span className="relative">Start Free</span>
                  </button>
                ) : (
                  <button className="w-full px-6 py-3 rounded-lg border border-slate-600 text-slate-50 hover:border-slate-500 hover:bg-white/5 transition font-medium">
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently asked questions</h2>
            <p className="text-slate-400">
              Can't find the answer you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:opacity-75 transition"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition duration-300 ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 pb-4 text-slate-400 border-t border-white/5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to ship better tests?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join teams that are testing smarter with AI-powered test case generation.
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 transition font-semibold shadow-lg shadow-violet-500/20">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/50 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">QA Buddy</div>
            <p className="text-slate-400 text-sm">AI-powered test case generation for modern teams.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-50 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2026 QA Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
