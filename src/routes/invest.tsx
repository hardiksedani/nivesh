import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/invest')({
  head: () => pageHead('Where to start investing in India', 'Popular SEBI-registered apps for mutual funds, stocks, gold and government savings, explained for beginners.'),
  component: InvestPage,
});

const platforms = [
  { name: 'Zerodha (Kite & Coin)', url: 'https://zerodha.com', tags: ['Stocks', 'Mutual funds', 'ETFs'], text: 'India\u2019s largest broker. Coin offers direct mutual funds; Varsity teaches the basics for free.' },
  { name: 'Groww', url: 'https://groww.in', tags: ['Mutual funds', 'Stocks', 'SIP'], text: 'Very simple interface, popular with first-time investors starting SIPs.' },
  { name: 'Upstox', url: 'https://upstox.com', tags: ['Stocks', 'Mutual funds', 'IPOs'], text: 'Low-cost broker with a clean app for stocks and funds.' },
  { name: 'Angel One', url: 'https://www.angelone.in', tags: ['Stocks', 'Mutual funds'], text: 'Full-featured broker with research tools and wide branch support.' },
  { name: 'Kuvera', url: 'https://kuvera.in', tags: ['Direct mutual funds', 'Goals'], text: 'Commission-free direct mutual funds with goal-based planning.' },
  { name: 'Paytm Money', url: 'https://www.paytmmoney.com', tags: ['Mutual funds', 'Stocks', 'NPS'], text: 'Funds, stocks and NPS inside a familiar payments ecosystem.' },
  { name: 'India Post / Bank (PPF)', url: 'https://www.indiapost.gov.in', tags: ['PPF', 'Government-backed'], text: 'Open a PPF account for safe, long-term, tax-efficient savings.' },
  { name: 'RBI Retail Direct', url: 'https://rbiretaildirect.org.in', tags: ['Government bonds'], text: 'Buy government securities directly from the Reserve Bank of India.' },
  { name: 'MF Central', url: 'https://www.mfcentral.com', tags: ['Track all funds'], text: 'Official portal to view and manage all your mutual fund holdings in one place.' },
];

function InvestPage() {
  return <main className="content-page">
    <span className="eyebrow">READY FOR THE NEXT STEP</span>
    <h1>Where you can start investing</h1>
    <p className="lede">Once you understand the basics, these well-known platforms let you open an account (KYC with PAN + Aadhaar) and start a SIP. NIVESH is not affiliated with any of them and does not recommend one — compare fees, features and support yourself.</p>
    <div className="platform-grid">{platforms.map(p => <article className="platform" key={p.name}>
      <h3>{p.name}</h3>
      <div className="platform-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
      <p>{p.text}</p>
      <Button asChild variant="outline"><a href={p.url} target="_blank" rel="noopener noreferrer">Visit website <ExternalLink /></a></Button>
    </article>)}</div>
    <p className="summary-note mt-8">Always check that a platform is registered with SEBI (sebi.gov.in) or AMFI. Never share OTPs or passwords, and avoid anyone promising guaranteed returns.</p>
  </main>;
}
