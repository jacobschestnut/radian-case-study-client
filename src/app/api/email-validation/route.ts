import { NextResponse } from 'next/server';

const API_KEY = '5a6adc6a3fab542b6eccbb97b1a46b4f606f1c86';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  try {
    const emailVerificationUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${API_KEY}`;
    const emailVerificationResponse = await fetch(emailVerificationUrl);

    if (!emailVerificationResponse.ok) {
      const errorMessage = await emailVerificationResponse.text();
      console.error('Hunter API Error:', errorMessage);
      return NextResponse.json({ error: 'Error validating email with Hunter API' }, { status: 500 });
    }

    const emailData = await emailVerificationResponse.json();
    
    return NextResponse.json(emailData);

  } catch (error) {
    console.error('Error occurred while verifying the email:', error);
    return NextResponse.json({ error: 'Internal error occurred' }, { status: 500 });
  }
}
