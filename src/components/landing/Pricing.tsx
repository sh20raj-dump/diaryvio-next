import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Start for free and upgrade when you're ready for more advanced features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Perfect for getting started with digital journaling
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
              <Link
                href="/login"
                className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-8">
              <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Included features:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Voice-to-Text Journaling</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Text Journaling with Markdown</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Smart Search</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic AI Companion</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 50 entries per month</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-500 rounded-2xl shadow-xl overflow-hidden relative">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
              POPULAR
            </div>
            
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-indigo-100 mb-6">
                For those who want the full journaling experience
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-indigo-200">/month</span>
              </div>
              <Link
                href="/login"
                className="block w-full bg-white text-indigo-600 text-center py-3 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
            <div className="bg-indigo-700 p-8 text-white">
              <h4 className="font-semibold mb-4">
                Everything in Free, plus:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited Entries</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Photo Memories</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Video Journals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced AI Personality Customization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Voice Chat Conversations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
