import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function makeReqId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  const reqId = makeReqId()

  try {
    let body: any
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'INVALID_JSON', reqId }, { status: 400 })
    }

    // Required fields
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // Optional fields
    const phone = typeof body.phone === 'string' ? body.phone.trim() : null
    const subject = typeof body.subject === 'string' ? body.subject.trim() : null
    const privacy = Boolean(body.privacy ?? false)
    const source = typeof body.source === 'string' ? body.source.trim() : 'contact_form'

    // Honeypot: treat ONLY non-empty values as spam (NOT merely because the field exists)
    const company = typeof body.company === 'string' ? body.company.trim() : ''
    const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : ''
    if (company || honeypot) {
      // Silent success to not signal bots
      return NextResponse.json({ ok: true, spam: true, reqId })
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'VALIDATION_ERROR', reason: 'missing_required_fields', reqId },
        { status: 400 }
      )
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'VALIDATION_ERROR', reason: 'invalid_email', reqId },
        { status: 400 }
      )
    }
    if (!privacy) {
      return NextResponse.json(
        { ok: false, error: 'VALIDATION_ERROR', reason: 'privacy_not_accepted', reqId },
        { status: 400 }
      )
    }

    // Accept both snake_case and camelCase + fall back to headers
    const pageUrlFromBody =
      (typeof body.page_url === 'string' ? body.page_url : typeof body.pageUrl === 'string' ? body.pageUrl : '') || ''
    const userAgentFromBody =
      (typeof body.user_agent === 'string'
        ? body.user_agent
        : typeof body.userAgent === 'string'
          ? body.userAgent
          : '') || ''

    const pageUrl = (pageUrlFromBody.trim() || '') || request.headers.get('referer') || null
    const userAgent = (userAgentFromBody.trim() || '') || request.headers.get('user-agent') || null

    // DB insert
    const supabase = getSupabaseAdmin()
    const { error: insertError } = await supabase.from('contact_requests').insert({
      name,
      email,
      phone,
      message: subject ? `[Betreff: ${subject}]\n\n${message}` : message,
      source,
      page_url: pageUrl,
      user_agent: userAgent,
      status: 'new',
    })

    if (insertError) {
      console.error('[contact][db]', { reqId, error: insertError })
      return NextResponse.json({ ok: false, error: 'DB_ERROR', reqId }, { status: 500 })
    }

    // Email notification (optional)
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      try {
        await resend.emails.send({
          from: 'homigo <noreply@homigo.tech>',
          to: 'hallo@homigo.tech',
          subject: subject ? `Kontakt: ${subject}` : 'Neue Kontaktanfrage',
          html: `
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(phone ?? '')}</p>
            <p><strong>Seite:</strong> ${escapeHtml(pageUrl ?? '')}</p>
            <p><strong>Nachricht:</strong></p>
            <pre style="white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(message)}</pre>
          `,
        })
      } catch (emailError) {
        console.error('[contact][email]', { reqId, error: emailError })
        return NextResponse.json({ ok: false, error: 'EMAIL_ERROR', reqId }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true, reqId })
  } catch (error) {
    console.error('[contact]', { reqId, error })
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR', reqId }, { status: 500 })
  }
}