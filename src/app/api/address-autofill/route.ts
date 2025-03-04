import { NextResponse } from 'next/server';

const API_KEY = 'a54867bcba8343d19b2a5dceb2773699';

export async function POST(req: Request) {
  const { address } = await req.json();

  try {
    const addressAutoFillUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${API_KEY}`;
    const addressAutoFillResponse = await fetch(addressAutoFillUrl);

    if (!addressAutoFillResponse.ok) {
      return NextResponse.json({ error: 'Error retrieving address autofill data' }, { status: 500 });
    }

    const autoFillData = await addressAutoFillResponse.json();
    
    return NextResponse.json(autoFillData);

  } catch (error) {
    return NextResponse.json({ error: 'Internal error occurred' }, { status: 500 });
  }
}