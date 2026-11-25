import { NextResponse, type NextRequest } from 'next/server';

/**
 * Demo gate. Only active when DEMO_PASSWORD is set (never in local dev).
 * - Basic auth on every page, so the link is not open to the world.
 * - The doctor desk, request-tracking pages and their APIs are switched off in demo mode.
 */
export function middleware(req: NextRequest) {
  const pass = process.env.DEMO_PASSWORD;
  if (!pass) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (/^\/(ta\/)?(doctor|track)(\/|$)/.test(pathname) || pathname.startsWith('/api/doctor')) {
    return new NextResponse('Not available in the demo.', { status: 404 });
  }

  const header = req.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      if (decoded.slice(decoded.indexOf(':') + 1) === pass) return NextResponse.next();
    } catch { /* fall through */ }
  }
  return new NextResponse('Password needed for this demo.', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Demo", charset="UTF-8"' } });
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
