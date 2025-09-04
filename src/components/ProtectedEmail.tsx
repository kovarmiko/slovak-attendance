import React, { useState } from 'react';
import CaptchaGate from './CaptchaGate';

type Props = {
  user: string;      // e.g. 'info'
  domain: string;    // e.g. 'vykazuje.me'
  label?: string;    // optional label text
};

export default function ProtectedEmail({ user, domain, label }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);

  const reveal = () => setOpen(true);
  const onVerified = () => setVerified(true);

  const mail = `${user}@${domain}`;
  const mailto = `mailto:${mail}`;

  return (
    <div className='space-y-2'>
      {!verified ? (
        <div className='space-y-2'>
          <button
            onClick={reveal}
            className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded'
            type='button'
            aria-expanded={open}
          >
            Zobraziť e‑mail ({label || domain})
          </button>
          {open && (
            <CaptchaGate onVerified={onVerified} />
          )}
        </div>
      ) : (
        <a href={mailto} className='text-blue-700 underline'>{mail}</a>
      )}
    </div>
  );
}

