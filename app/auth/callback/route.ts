import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { deriveNameFromEmail } from '@/data/mockData';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;

  // 1. Extract code and role parameter
  const code = searchParams.get('code');
  const roleParam = searchParams.get('role');
  const role = roleParam === 'client' ? 'client' : 'freelancer';

  // Origin handling for local & deployed domains behind proxies
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const origin = forwardedHost ? `${forwardedProto}://${forwardedHost}` : requestUrl.origin;

  // Check for error parameters returned from provider
  const error = searchParams.get('error_description') || searchParams.get('error');
  if (error) {
    console.error('[OAuth Callback Provider Error]:', error);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`);
  }

  if (code) {
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xpkndlxtpphaqaluxaaf.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_HG0rNkrzciOmPx4HFHoh2g_5smdTA13';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_Z70ElpZTZ4yG6rU7BfK5yw_Rls1JEHZ';

    // 1. Code Exchange: Initialize server client with cookie storage
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value ?? null,
          setItem: (key: string, value: string) => {
            try {
              cookieStore.set(key, value, { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });
            } catch {}
          },
          removeItem: (key: string) => {
            try {
              cookieStore.delete(key);
            } catch {}
          },
        },
      },
    });

    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('[OAuth Callback Error] Code exchange failed:', exchangeError.message);
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
      }

      const user = data?.user || data?.session?.user;

      if (user) {
        const email = user.email || '';
        const metadata = user.user_metadata || {};
        const fullName = metadata.full_name || metadata.name || deriveNameFromEmail(email);
        const avatarUrl = metadata.avatar_url || metadata.picture || '';

        // 2. Role & Profile Upsert: upsert in profiles table
        const profilePayload = {
          id: user.id,
          email: user.email,
          full_name: fullName,
          role: role || 'freelancer',
          avatar_url: avatarUrl,
        };

        try {
          const adminClient = supabaseServiceKey
            ? createClient(supabaseUrl, supabaseServiceKey)
            : supabase;

          const { error: profileError } = await adminClient
            .from('profiles')
            .upsert(profilePayload, { onConflict: 'id' });

          if (profileError) {
            console.error('[Profiles Upsert Error]:', profileError.message);
          }
        } catch (dbErr: any) {
          console.error('[Profiles Upsert Exception]:', dbErr?.message || dbErr);
        }

        // 3. Correct Redirect: User ko unke role ke mutabiq redirect karo
        const dashboardPath = `${role === 'client' ? 'client' : 'freelancer'}/dashboard`;
        const response = NextResponse.redirect(`${origin}/${dashboardPath}`);

        // Set session cookies compatible with middleware.ts and AppContext.tsx
        const cookieOptions = {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax' as const,
        };

        response.cookies.set('user_role', role, cookieOptions);
        response.cookies.set('auth_token', `tp_oauth_${user.id}_${Date.now()}`, cookieOptions);

        const clientSessionData = {
          id: user.id,
          name: fullName,
          role: role,
          email: email,
          avatar: avatarUrl,
        };
        response.cookies.set('techpunjab_user_session', JSON.stringify(clientSessionData), cookieOptions);

        return response;
      }
    } catch (err: any) {
      console.error('[OAuth Callback Unexpected Error]:', err);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(err?.message || 'Authentication error')}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_code_missing`);
}
