import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const data = await resend.emails.send({
      from: 'website@homigo.tech',
      to: 'hallo@homigo.tech',
      subject: `Neue Anfrage: ${subject}`,
      html: `
        <h2>Neue Kontaktanfrage von homigo.tech</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Betreff:</strong> ${subject}</p>
        <div style="margin-top: 20px;">
          <h3>Nachricht:</h3>
          <p>${message}</p>
        </div>
      `,
    });

    // Bestätigungs-E-Mail an Absender
    await resend.emails.send({
      from: 'noreply@homigo.tech',
      to: email,
      subject: 'Ihre Anfrage bei homigo - Bestätigung',
      html: `
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Hallo ${name},</p>
        <p>vielen Dank für Ihre Anfrage bezüglich unserer Smart Home Beratung. Ich habe Ihre Nachricht erhalten und werde mich innerhalb der nächsten 24 Stunden bei Ihnen melden.</p>
        <p>Mit freundlichen Grüßen,<br>Damon von homigo</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('E-Mail Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Senden' },
      { status: 500 }
    );
  }
}