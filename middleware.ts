import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const role = request.cookies.get('user_role')?.value;
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = Boolean(token && role);

  // 1. Root route ('/'): STRICTLY COMPULSORY LOGIN!
  if (pathname === '/') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role === 'freelancer') {
      return NextResponse.redirect(new URL('/freelancer/dashboard', request.url));
    } else if (role === 'client') {
      return NextResponse.redirect(new URL('/client/dashboard', request.url));
    }
  }

  // 2. Protect /freelancer/* routes: Only authenticated freelancers allowed
  if (pathname.startsWith('/freelancer')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== 'freelancer') {
      return NextResponse.redirect(new URL('/client/dashboard', request.url));
    }
  }

  // 3. Protect /client/* routes: Only authenticated clients/MSMEs allowed
  if (pathname.startsWith('/client')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== 'client') {
      return NextResponse.redirect(new URL('/freelancer/dashboard', request.url));
    }
  }

  // 4. Authenticated users visiting /login or /signup go directly to their dashboard
  if (pathname === '/login' || pathname === '/signup') {
    if (isAuthenticated) {
      if (role === 'freelancer') {
        return NextResponse.redirect(new URL('/freelancer/dashboard', request.url));
      } else if (role === 'client') {
        return NextResponse.redirect(new URL('/client/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/freelancer/:path*',
    '/client/:path*',
  ],
};
