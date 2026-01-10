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

function notionQuelle(source: string) {
  // Must match Select options in Notion DB
  const s = (source || '').toLowerCase()
  if (['kontaktformular', 'website', 'web', 'homigo.tech', 'homigo'].includes(s)) return 'Website'
  if (['recommendation', 'empfehlung', 'referral'].includes(s)) return 'Empfehlung'
  return 'Sonstiges'
}

function notionAnfrageTyp(label: string) {
  // Must match Select options in Notion DB
  const l = (label || '').toLowerCase()
  if (l.includes('allgemein')) return 'Allgemeine Anfrage'
  if (l.includes('termin') || l.includes('planung')) return 'Termin/Planung'
  if (l.includes('hardware')) return 'Hardware'
  return 'Unklar'
}

function subjectLabel(subject: string | null) {
  if (!subject) return 'Allgemeine Anfrage'
  const s = subject.toLowerCase()
  if (s === 'beratung') return 'Allgemeine Anfrage'
  if (s === 'planung') return 'Termin/Planung'
  return subject
}

const NOTION_VERSION = '2022-06-28'

type NotionLeadInput = {
  name: string
  email: string
  phone: string | null
  subjectLabel: string
  message: string
  source: string
  receivedAtISO: string
  supabaseId: string | null
  pageUrl: string | null
  userAgent: string | null
  reqId: string
}

async function createNotionLead(input: NotionLeadInput) {
  const notionKey = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_DB_LEADS_ID

  // Notion sync is optional and must never block the contact flow.
  if (!notionKey || !dbId) return

  const safe = (v: string | null | undefined) => (typeof v === 'string' ? v : '')

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        // Property names must match your Notion DB exactly
        Name: {
          title: [{ text: { content: input.name } }],
        },
        'E-Mail': {
          email: input.email,
        },
        Telefon: {
          rich_text: [{ text: { content: safe(input.phone) } }],
        },
        Status: {
          select: { name: 'Neu' },
        },
        'Anfrage-Typ': {
          select: { name: notionAnfrageTyp(input.subjectLabel) },
        },
        Quelle: {
          select: { name: notionQuelle(input.source) },
        },
        Eingang: {
          date: { start: input.receivedAtISO },
        },
        'Supabase-ID': {
          rich_text: [{ text: { content: safe(input.supabaseId) } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: 'Nachricht' } }],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: safe(input.message) } }],
          },
        },
        {
          object: 'block',
          type: 'divider',
          divider: {},
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: `Seite: ${safe(input.pageUrl)}` } },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: `User-Agent: ${safe(input.userAgent)}` } },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: `Request-ID: ${safe(input.reqId)}` } },
            ],
          },
        },
      ],
    }),
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(
      `Notion API error (${res.status}). Check Select options + DB sharing. Response: ${txt}`
    )
  }
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
    const source = typeof body.source === 'string' ? body.source.trim() : 'kontaktformular'

    // Honeypot: treat ONLY non-empty values as spam
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

    // DB insert (return id for easier follow-up/status handling)
    const supabase = getSupabaseAdmin()

    const storedMessage = subject ? `[Betreff: ${subjectLabel(subject)}]\n\n${message}` : message

    const { data: inserted, error: insertError } = await supabase
      .from('contact_requests')
      .insert({
        name,
        email,
        phone,
        message: storedMessage,
        source,
        page_url: pageUrl,
        user_agent: userAgent,
        status: 'new',
        // handled_at exists after your schema update; if not yet present, Supabase will ignore unknown columns.
        handled_at: null,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('[contact][db]', { reqId, error: insertError })
      return NextResponse.json({ ok: false, error: 'DB_ERROR', reqId }, { status: 500 })
    }

    const recordId = inserted?.id ?? null

    // Notion sync (server-side). Non-fatal by design.
    try {
      await createNotionLead({
        name,
        email,
        phone,
        subjectLabel: subjectLabel(subject),
        message,
        source,
        receivedAtISO: new Date().toISOString(),
        supabaseId: recordId,
        pageUrl,
        userAgent,
        reqId,
      })
    } catch (notionError) {
      console.error('[contact][notion]', { reqId, recordId, error: notionError })
    }

    // Email (Resend) – optional but recommended.
    // We treat email failures as NON-fatal so the contact request is never lost.
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)

      const from = 'homigo <noreply@homigo.tech>'
      const replyTo = 'hallo@homigo.tech'
      const notifyTo = 'hallo@homigo.tech'

      // 2a) Internal notification
      try {
        await resend.emails.send({
          from,
          to: notifyTo,
          reply_to: replyTo,
          subject: `Neue Kontaktanfrage: ${subjectLabel(subject)}${recordId ? ` (#${recordId})` : ''}`,
          html: `
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(phone ?? '')}</p>
            <p><strong>Betreff:</strong> ${escapeHtml(subjectLabel(subject))}</p>
            <p><strong>Seite:</strong> ${escapeHtml(pageUrl ?? '')}</p>
            <p><strong>User-Agent:</strong> ${escapeHtml(userAgent ?? '')}</p>
            <p><strong>Request-ID:</strong> ${escapeHtml(reqId)}</p>
            ${recordId ? `<p><strong>Datensatz-ID:</strong> ${escapeHtml(recordId)}</p>` : ''}
            <p><strong>Nachricht:</strong></p>
            <pre style="white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(message)}</pre>
          `,
        })
      } catch (emailError) {
        console.error('[contact][email][internal]', { reqId, recordId, error: emailError })
      }

      // 2b) User confirmation (no tracking)
      try {
        await resend.emails.send({
          from,
          to: email,
          reply_to: replyTo,
          subject: 'Wir haben deine Nachricht erhalten – homigo',
          html: `
            <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #0f172a;">
              <h2 style="margin: 0 0 12px 0;">Danke, ${escapeHtml(name)}!</h2>
              <p style="margin: 0 0 12px 0;">Wir haben deine Nachricht erhalten und melden uns in der Regel innerhalb von <strong>24 Stunden</strong>.</p>
              <p style="margin: 0 0 12px 0;"><strong>Betreff:</strong> ${escapeHtml(subjectLabel(subject))}</p>
              <p style="margin: 0 0 12px 0;"><strong>Deine Nachricht:</strong></p>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 10px; white-space: pre-wrap;">${escapeHtml(message)}</div>
              <p style="margin: 16px 0 0 0; font-size: 12px; color: #475569;">Referenz: ${escapeHtml(reqId)}${recordId ? ` • Datensatz: ${escapeHtml(recordId)}` : ''}</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569;">Wenn du diese Nachricht nicht selbst gesendet hast, kannst du sie ignorieren.</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('[contact][email][user]', { reqId, recordId, error: emailError })
      }
    }

    return NextResponse.json({ ok: true, reqId, id: recordId })
  } catch (error) {
    console.error('[contact]', { reqId, error })
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR', reqId }, { status: 500 })
  }
}