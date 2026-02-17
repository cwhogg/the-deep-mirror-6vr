'use client';

import { useState, FormEvent } from 'react';
import JsonLd from '../components/content/JsonLd';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error — please try again');
    }
  }

  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Organization","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"WebSite","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Has the Enneagram been debunked by psychologists?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram system itself has research support, but most assessment tools are poorly designed. Static surveys can't capture the dynamic nature of personality patterns, leading to high mistyping rates that damage the system's credibility."}},{"@type":"Question","name":"What makes this different from other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Traditional tests use static questionnaires that can't probe deeper when answers are inconsistent. Our AI interviewer asks follow-up questions, catches contradictions, and adapts questioning based on your responses in real-time."}},{"@type":"Question","name":"Why are current Enneagram coaching tools inaccurate?","acceptedAnswer":{"@type":"Answer","text":"Most tools prioritize user experience over accuracy, leading to social desirability bias where people answer how they want to be seen. Executive coaches need tools that reveal authentic patterns, not flattering results."}},{"@type":"Question","name":"How much does clinical-grade Enneagram testing cost?","acceptedAnswer":{"@type":"Answer","text":"Professional tools like iEQ9 charge $30-60 per assessment plus certification fees. We're building a more accessible solution that maintains clinical accuracy without the premium pricing structure."}},{"@type":"Question","name":"What's the best Enneagram assessment for HR applications?","acceptedAnswer":{"@type":"Answer","text":"Current HR tools either lack Enneagram depth or require expensive per-user licensing. We're designed specifically for organizational use with accurate typing that scales efficiently for team assessments."}}]}} />

      <header className="border-b border-border bg-background-elevated">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            The Deep Mirror
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
            <a href="/compare" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
            <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section aria-label="Hero" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4 leading-tight">
            Why Enneagram Tests Are Inaccurate (And How AI Fixes This)
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Replace static surveys with conversational AI that probes inconsistencies and catches social desirability bias. Built for executive coaching tools that demand clinical-grade accuracy.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary font-medium">Thanks for signing up! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background-elevated border border-border text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : `Get Early Access`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* Value Props */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Why The Deep Mirror?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <section aria-label="Conversational Depth Over Static Surveys" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Conversational Depth Over Static Surveys</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Our AI interviewer catches contradictions that reveal true motivations. No more guessing between types because a survey couldn't probe deeper.</p>
          </section>
          <section aria-label="Clinical-Grade Enneagram Assessment" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Clinical-Grade Enneagram Assessment</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Built for executive coaches who need accuracy over feel-good results. Incorporates Naranjo's subtype distinctions and reduces mistyping through dynamic questioning.</p>
          </section>
          <section aria-label="Eliminates Social Desirability Bias" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminates Social Desirability Bias</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Traditional tests fail because people answer how they want to be seen. Our conversational approach reveals authentic patterns through indirect questioning.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Has the Enneagram been debunked by psychologists?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram system itself has research support, but most assessment tools are poorly designed. Static surveys can't capture the dynamic nature of personality patterns, leading to high mistyping rates that damage the system's credibility.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What makes this different from other Enneagram tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Traditional tests use static questionnaires that can't probe deeper when answers are inconsistent. Our AI interviewer asks follow-up questions, catches contradictions, and adapts questioning based on your responses in real-time.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why are current Enneagram coaching tools inaccurate?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Most tools prioritize user experience over accuracy, leading to social desirability bias where people answer how they want to be seen. Executive coaches need tools that reveal authentic patterns, not flattering results.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How much does clinical-grade Enneagram testing cost?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Professional tools like iEQ9 charge \$30-60 per assessment plus certification fees. We're building a more accessible solution that maintains clinical accuracy without the premium pricing structure.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What's the best Enneagram assessment for HR applications?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Current HR tools either lack Enneagram depth or require expensive per-user licensing. We're designed specifically for organizational use with accurate typing that scales efficiently for team assessments.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border bg-background-elevated mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">&copy; 2026 The Deep Mirror. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/" className="text-text-muted hover:text-text transition-colors">Home</a>
              <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
              <a href="/compare" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
              <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
