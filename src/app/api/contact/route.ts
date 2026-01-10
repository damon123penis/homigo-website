import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Ungültige Anfrage.' }, { status: 400 })
    }

    const nameRaw = String(body.name ?? '').trim()
    const emailRaw = String(body.email ?? '').trim()
    const phoneRaw = String(body.phone ?? '').trim() || null
    const subjectRaw = String(body.subject ?? '').trim() || 'Kontaktanfrage'
    const messageRaw = String(body.message ?? '').trim()

    const name = nameRaw
    const email = emailRaw
    const phone = phoneRaw
    const subject = subjectRaw
    const message = messageRaw

    const nameHtml = escapeHtml(name)
    const emailHtml = escapeHtml(email)
    const subjectHtml = escapeHtml(subject)
    const messageHtml = escapeHtml(message).replace(/\n/g, '<br/>')
    const phoneHtml = phone ? escapeHtml(phone) : null

    // Optional honeypot (falls du es im Formular ergänzt)
    const hp = String(body.company ?? '').trim()
    if (hp) {
      return NextResponse.json({ success: true })
    }

    if (name.length < 2) {
      return NextResponse.json({ success: false, error: 'Bitte gib deinen Namen an.' }, { status: 400 })
    }

    if (!isEmail(email)) {
      return NextResponse.json({ success: false, error: 'Bitte gib eine gültige E-Mail an.' }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Bitte beschreibe dein Anliegen etwas genauer.' },
        { status: 400 }
      )
    }

    const pageUrl = request.headers.get('referer') || null
    const userAgent = request.headers.get('user-agent') || null

    // 1) Lead in Supabase speichern
    const { error: dbError } = await supabaseAdmin
      .from('contact_requests')
      .insert({
        name,
        email,
        message,
        source: 'kontaktformular',
        page_url: pageUrl,
        user_agent: userAgent,
        status: 'new',
      })

    if (dbError) {
      console.error('Supabase Fehler:', dbError)
      return NextResponse.json(
        { success: false, error: 'Speichern fehlgeschlagen.' },
        { status: 500 }
      )
    }

    const key = process.env.RESEND_API_KEY
    if (!key) {
      console.warn('RESEND_API_KEY fehlt – E-Mails werden nicht versendet (Lead wurde gespeichert).')
      return NextResponse.json({ success: true })
    }
    const resend = new Resend(key)

    // 2) Interne Benachrichtigungs-Mail
    await resend.emails.send({
      from: 'website@homigo.tech',
      to: 'hallo@homigo.tech',
      subject: `Neue Anfrage: ${subjectHtml}`,
      html: `
        <h2>Neue Kontaktanfrage von homigo.tech</h2>
        <p><strong>Name:</strong> ${nameHtml}</p>
        <p><strong>E-Mail:</strong> ${emailHtml}</p>
        ${phoneHtml ? `<p><strong>Telefon:</strong> ${phoneHtml}</p>` : ''}
        <p><strong>Betreff:</strong> ${subjectHtml}</p>
        <div style="margin-top: 20px;">
          <h3>Nachricht:</h3>
          <p>${messageHtml}</p>
        </div>
      `,
    })

    // 3) Bestätigungs-Mail an Absender
    await resend.emails.send({
      from: 'noreply@homigo.tech',
      to: email,
      subject: 'Ihre Anfrage bei homigo – Bestätigung',
      html: `
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Hallo ${nameHtml},</p>
        <p>
          vielen Dank für Ihre Anfrage bezüglich unserer Smart-Home-Beratung.
          Ich habe Ihre Nachricht erhalten und melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.
        </p>
        <p>Viele Grüße<br/>Damon von homigo</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Kontaktformular Fehler:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler bei der Verarbeitung.' },
      { status: 500 }
    )
  }
}