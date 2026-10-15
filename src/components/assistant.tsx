import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { MessageCircle, X, Send, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Msg = { role: 'user' | 'assistant'; text: string; link?: { to: string; label: string } };

const SUGGESTIONS = [
  'Where should I start with ₹8,000/month?',
  'What is a SIP?',
  'How long to reach ₹10 lakh?',
  'Which apps can I invest with?',
];

const ANSWERS: { keys: string[]; text: string; link?: { to: string; label: string } }[] = [
  {
    keys: ['start', 'begin', '8000', '8,000', 'first', 'where'],
    text: "A simple start: keep 3–6 months of expenses in an emergency fund first, then split the rest — most into a low-cost Nifty 50 index fund, some into a short-term debt fund, and a little gold. Try the planner to see your own split.",
    link: { to: '/planner', label: 'Open the planner' },
  },
  {
    keys: ['sip'],
    text: "A SIP (Systematic Investment Plan) invests a fixed amount every month automatically. It builds discipline and averages out market ups and downs — you buy more units when prices are low. It's a method, not a product: most SIPs go into mutual funds.",
    link: { to: '/learn', label: 'Learn the basics' },
  },
  {
    keys: ['10 lakh', '10lakh', 'million', 'goal', 'how long', 'crore'],
    text: "At ₹8,000/month growing 10% a year with ~12% annual returns, ₹10 lakh takes roughly 6–7 years. It's a simulation, not a promise — markets move. Drag the sliders on the timeline to test your own numbers.",
    link: { to: '/planner', label: 'See your timeline' },
  },
  {
    keys: ['app', 'platform', 'trade', 'broker', 'zerodha', 'groww', 'upstox'],
    text: "Once you've learned the basics, you can invest through SEBI-registered apps like Groww, Zerodha or Upstox. NIVESH doesn't recommend one — compare fees and check SEBI registration before signing up. Never share your OTP with anyone.",
    link: { to: '/invest', label: 'Compare investing apps' },
  },
  {
    keys: ['risk', 'safe', 'lose', 'loss'],
    text: "Every investment carries risk — even FDs have inflation risk. Higher expected return always means higher risk of loss. Stocks can fall sharply; index funds spread that risk across many companies. Only invest money you won't need soon.",
    link: { to: '/explore', label: 'Compare risk levels' },
  },
  {
    keys: ['fd', 'fixed deposit', 'bank'],
    text: "A fixed deposit is safe and predictable, but returns (around 6–7%) barely beat inflation. Good for short-term goals and your emergency fund — too slow alone for a ₹10 lakh goal.",
    link: { to: '/compare', label: 'Compare options' },
  },
  {
    keys: ['emergency'],
    text: "Before investing, park 3–6 months of expenses in a savings account or liquid fund. It's boring but it stops you from selling investments at a bad time when life happens.",
  },
  {
    keys: ['gold'],
    text: "Gold is a hedge, not a growth engine. A small allocation (5–10%) via gold ETFs or sovereign gold bonds can steady a portfolio, but it shouldn't be your main investment.",
  },
  {
    keys: ['stock', 'share'],
    text: "A stock is a small ownership piece of a company. Prices swing a lot, and single companies can fail. Beginners usually do better with index funds that hold hundreds of companies at once.",
    link: { to: '/learn', label: 'Learn about stocks' },
  },
];

const FALLBACK =
  "I'm a simple demo helper, so I know the basics covered on this site: SIPs, index funds, FDs, gold, emergency funds, risk, and investing apps. Try one of the suggested questions, or explore the Learn page.";

function answerFor(input: string) {
  const q = input.toLowerCase();
  return ANSWERS.find((a) => a.keys.some((k) => q.includes(k))) ?? { text: FALLBACK };
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: "Hi! I'm Nivi, your learning guide. Ask me anything about starting to invest — SIPs, risk, your ₹10 lakh goal, or where to begin.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function send(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { role: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    const reply = answerFor(clean);
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: reply.text, link: reply.link }]);
      setTyping(false);
      inputRef.current?.focus();
    }, 700);
  }

  return (
    <>
      <button
        type="button"
        className="assistant-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      {open && (
        <section className="assistant-panel" aria-label="Nivi learning assistant">
          <header className="assistant-head">
            <span className="assistant-avatar" aria-hidden="true"><Sprout size={18} /></span>
            <div>
              <p className="assistant-name">Nivi</p>
              <p className="assistant-sub">Demo learning guide — not financial advice</p>
            </div>
          </header>
          <div className="assistant-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'assistant-row user' : 'assistant-row'}>
                <div className={m.role === 'user' ? 'assistant-bubble user' : 'assistant-bubble'}>
                  <p>{m.text}</p>
                  {m.link && (
                    <Link to={m.link.to} className="assistant-link" onClick={() => setOpen(false)}>
                      {m.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="assistant-row">
                <div className="assistant-bubble assistant-typing" aria-label="Nivi is typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>
          <div className="assistant-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} disabled={typing}>
                {s}
              </button>
            ))}
          </div>
          <form
            className="assistant-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about investing basics..."
              aria-label="Message Nivi"
            />
            <Button type="submit" size="icon" variant="premium" disabled={typing || !input.trim()} aria-label="Send message">
              <Send size={16} />
            </Button>
          </form>
        </section>
      )}
    </>
  );
}
