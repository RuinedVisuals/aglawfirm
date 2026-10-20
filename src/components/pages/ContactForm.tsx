'use client';

import { useState, type FormEvent } from 'react';
import { Magnetic } from '@/components/site/Magnetic';
import type { Dict } from '@/content/content';

type F = Dict['contact']['form'];

export function ContactForm({ f }: { f: F }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setState('sending');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      setState(r.ok ? 'sent' : 'error');
    } catch { setState('error'); }
  }

  if (state === 'sent') {
    return (
      <div className="stack-24 pt-24" role="status">
        <span className="serif italic gold form__ok">{f.ok}</span>
        <p className="lede on-navy">{f.okText}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label className="field"><span>{f.name} *</span><input required name="name" autoComplete="name" minLength={2} /></label>
      <div className="auto-grid-200 gap-field">
        <label className="field"><span>{f.email} *</span><input required type="email" name="email" autoComplete="email" /></label>
        <label className="field"><span>{f.phone}</span><input type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <label className="field"><span>{f.area}</span>
        <select name="area">{f.areas.map((a) => <option key={a}>{a}</option>)}</select>
      </label>
      <label className="field"><span>{f.msg}</span><textarea name="msg" rows={4} maxLength={600} /></label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <span className="form__note">{f.note}</span>
      <label className="consent"><input required type="checkbox" name="consent" />{f.consent}</label>
      {state === 'error' && <span className="form__err" role="alert">Something went wrong — please call the office.</span>}
      <Magnetic className="self-start">
        <button type="submit" className="btn btn--gold" disabled={state === 'sending'}>{f.send} <span>→</span></button>
      </Magnetic>
    </form>
  );
}
