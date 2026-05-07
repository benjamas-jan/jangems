import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Edge-runtime compatible. Verifies JWT signature only — full session
// payload re-validation happens in server actions / page loads.

const SESSION_COOKIE = 'jg_session';

let cachedKey: Uint8Array | null = null;
function key(): Uint8Array {
  if (cachedKey) return cachedKey;
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('Missing AUTH_SECRET');
  cachedKey = new TextEncoder().encode(s);
  return cachedKey;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  try {
    await jwtVerify(token, key());
    return NextResponse.next();
  } catch {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
