import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const role = requestUrl.searchParams.get('role') || 'freelancer';
  const targetRole = role === 'client' ? 'client' : 'freelancer';
  const origin = requestUrl.origin;

  const error = requestUrl.searchParams.get('error_description') || requestUrl.searchParams.get('error');
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`);
  }

  if (code) {
    try {
      // Exchange code for Supabase session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('[OAuth Callback Error] Code exchange failed:', exchangeError);
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
      }

      if (data?.user) {
        const user = data.user;
        const email = user.email || '';
        const metadata = user.user_metadata || {};
        const fullName = metadata.full_name || metadata.name || (email ? email.split('@')[0] : 'TechPunjab User');
        const avatarUrl = metadata.avatar_url || metadata.picture || '';

        // Database upsert: profiles / users table
        try {
          const profilePayload = {
            id: user.id,
            email: email,
            full_name: fullName,
            avatar_url: avatarUrl,
            role: targetRole,
            updated_at: new Date().toISOString(),
          };

          // Try profiles table first
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert(profilePayload, { onConflict: 'id' });

          if (profileError) {
            console.warn('[Profiles upsert fallback to users table]:', profileError.message);
            try {
              await supabase
                .from('users')
                .upsert(profilePayload, { onConflict: 'id' });
            } catch (uErr) {
              console.warn('[Users table fallback note]:', uErr);
            }
          }
        } catch (dbErr) {
          console.warn('[Database Upsert Note]:', dbErr);
        }

        // Determine destination dashboard
        const dashboardPath = targetRole === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard';
        const response = NextResponse.redirect(new URL(dashboardPath, origin));

        // Set session cookies compatible with middleware.ts and AppContext
        response.cookies.set('user_role', targetRole, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
        });
        response.cookies.set('auth_token', `tp_oauth_${user.id}_${Date.now()}`, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
        });

        // Pack session info for client-side storage hydration
        const clientSessionData = {
          id: user.id,
          name: fullName,
          role: targetRole,
          email: email,
          avatar: avatarUrl,
        };
        response.cookies.set('techpunjab_user_session', JSON.stringify(clientSessionData), {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
        });

        return response;
      }
    } catch (err: any) {
      console.error('[OAuth Callback Unexpected Error]:', err);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(err.message || 'Authentication error')}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_code_missing`);
}
