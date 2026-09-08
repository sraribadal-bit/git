import { NextResponse } from 'next/server';
import { getOtp, deleteOtp } from '@/lib/otpStore';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, token, role } = body;

    if (!phone || !token) {
      return NextResponse.json(
        { success: false, error: 'Phone number and 6-digit OTP code are required.' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const cleanToken = String(token).trim();

    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid 10-digit mobile number format.' },
        { status: 400 }
      );
    }

    if (cleanToken.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'OTP must be exactly 6 digits.' },
        { status: 400 }
      );
    }

    const storedOtp = getOtp(cleanPhone);

    if (!storedOtp) {
      return NextResponse.json(
        {
          success: false,
          error: 'OTP code has expired (valid 5 mins) or was not requested. Please request a new OTP.',
        },
        { status: 400 }
      );
    }

    if (storedOtp !== cleanToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code. Please check and enter the correct OTP.' },
        { status: 400 }
      );
    }

    // OTP verified successfully - clear from memory to prevent reuse
    deleteOtp(cleanPhone);

    const targetRole = role === 'client' ? 'client' : 'freelancer';
    const formattedPhone = `+91${cleanPhone}`;
    const displayName =
      targetRole === 'freelancer'
        ? `Trainee (+91 ${cleanPhone.slice(-4)})`
        : `MSME Client (+91 ${cleanPhone.slice(-4)})`;
    const userId = `tp_usr_${cleanPhone}`;

    // Database Profile Sync: attempt to sync with Supabase profiles table if available
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', formattedPhone)
        .maybeSingle();

      if (!existingProfile) {
        await supabase.from('profiles').insert([
          {
            phone: formattedPhone,
            role: targetRole,
            full_name: displayName,
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (dbErr) {
      // Non-blocking fallback if profiles table schema is not yet defined
      console.warn('[Database Sync Note] Profiles table sync omitted:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Mobile OTP verified successfully.',
      user: {
        id: userId,
        phone: formattedPhone,
        role: targetRole,
        name: displayName,
      },
      token: `tp_fast2sms_token_${Date.now()}_${cleanPhone}`,
    });
  } catch (err: any) {
    console.error('[verify-otp route error]', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
