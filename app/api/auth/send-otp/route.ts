import { NextResponse } from 'next/server';
import { setOtp } from '@/lib/otpStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Mobile phone number is required.' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in-memory with 5-minute TTL
    setOtp(cleanPhone, otp, 5 * 60 * 1000);
    console.log(`[TechPunjab Auth] Generated OTP for +91${cleanPhone}: ${otp}`);

    const apiKey = process.env.FAST2SMS_API_KEY?.trim();

    if (apiKey) {
      // Send real SMS via Fast2SMS Quick SMS API (OTP Route)
      const f2sResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: cleanPhone,
        }),
      });

      const f2sData = await f2sResponse.json().catch(() => null);

      if (!f2sResponse.ok || !f2sData?.return) {
        const errorMsg =
          f2sData?.message?.[0] ||
          f2sData?.message ||
          'Fast2SMS API delivery error. Please check your Fast2SMS API key and credits.';
        console.error('[Fast2SMS Error]', f2sData);
        return NextResponse.json(
          { success: false, error: errorMsg, devOtp: otp },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `OTP delivered via Fast2SMS to +91 ${cleanPhone}.`,
        phone: cleanPhone,
      });
    } else {
      // Development mode fallback when FAST2SMS_API_KEY is pending in .env.local
      console.warn('[Fast2SMS Notice] FAST2SMS_API_KEY is not set in .env.local. Test OTP is:', otp);
      return NextResponse.json({
        success: true,
        message: `Fast2SMS API key is not configured yet. Test OTP code: ${otp}`,
        devOtp: otp,
        phone: cleanPhone,
      });
    }
  } catch (err: any) {
    console.error('[send-otp route error]', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
