import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: any;
  }
}

type Props = {
  onVerified: () => void;
  className?: string;
};

export default function CaptchaGate({ onVerified, className }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const sitekey = (import.meta as any).env?.VITE_TURNSTILE_SITEKEY as string | undefined;
  const [useTurnstile, setUseTurnstile] = useState<boolean>(Boolean(sitekey));

  useEffect(() => {
    if (!sitekey) return; // fallback to puzzle below
    setUseTurnstile(true);
    const existing = document.getElementById('cf-turnstile-script');
    const onload = () => setLoaded(true);
    if (existing) {
      if ((window as any).turnstile) setLoaded(true);
      else existing.addEventListener('load', onload, { once: true });
      return;
    }
    const s = document.createElement('script');
    s.id = 'cf-turnstile-script';
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    s.onload = onload;
    document.head.appendChild(s);
  }, [sitekey]);

  useEffect(() => {
    if (!useTurnstile || !loaded || !sitekey) return;
    const el = containerRef.current;
    if (!el) return;

    try {
      window.turnstile?.render(el, {
        sitekey,
        callback: () => onVerified(),
        action: 'reveal_email',
      });
    } catch {
      // noop
    }
  }, [loaded, onVerified, sitekey, useTurnstile]);

  // Simple fallback puzzle to deter basic bots (hooks declared unconditionally)
  const [a] = useState(() => Math.floor(Math.random() * 6) + 2); // 2..7
  const [b] = useState(() => Math.floor(Math.random() * 6) + 2);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = a + b;
    if (Number(answer) === expected) onVerified();
    else setError('Nesprávny výsledok, skúste znova.');
  };

  if (useTurnstile && sitekey) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <form onSubmit={submit} className={className}>
      <label className='mr-2'>Overenie: {a} + {b} = </label>
      <input
        type='number'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className='border rounded px-2 py-1 w-20'
        required
        aria-label='Výsledok sčítania'
      />
      <button type='submit' className='ml-2 bg-gray-900 text-white px-3 py-1 rounded'>Potvrdiť</button>
      {error && <div className='text-sm text-red-600 mt-1'>{error}</div>}
    </form>
  );
}
