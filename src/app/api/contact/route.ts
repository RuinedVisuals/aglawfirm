import { NextResponse } from 'next/server';

// Minimal server-side validation + naive in-memory rate limit.
// Production: use a durable rate limiter (e.g. Upstash) and send mail via SMTP/Resend to process.env.CONTACT_TO.
const hits = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < 60_000 && h.n >= 5) return NextResponse.json({ ok: false }, { status: 429 });
  hits.set(ip, h && now - h.t < 60_000 ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false }, { status: 400 });
  if (b.company) return NextResponse.json({ ok: true }); // honeypot

  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim();
  const msg = String(b.msg ?? '').slice(0, 600);
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || b.consent !== 'on') {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  // TODO: deliver { name, email, phone: b.phone, area: b.area, msg } to the firm's inbox.
  void msg;
  return NextResponse.json({ ok: true });
}
