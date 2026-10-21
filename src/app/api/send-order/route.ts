import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Validate API key exists before initializing Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is missing');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Initialize Resend client at request time
    const resend = new Resend(resendApiKey);

    const body = await request.json();
    const { name, phone, email, location, notes, cart, total } = body;

    // Validate required fields
    if (!name || !phone || !email || !location || !cart || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format cart items for email
    const cartItems = cart
      .map((item: any) => `• ${item.name} (${item.capacity}) - ${item.price} x ${item.quantity}`)
      .join('\n');

    const emailContent = `
New Order Received

Customer Details:
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Location: ${location}
${notes ? `• Notes: ${notes}` : ''}

Order Details:
${cartItems}

Total: KSh ${total.toLocaleString()}

Please contact the customer with delivery details and payment options.
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Kentank Orders <onboarding@resend.dev>',
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kentank4414@gmail.com',
      subject: `New Water Tank Order - ${name}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
