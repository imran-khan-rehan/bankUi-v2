'use server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function middleware(req) {
  const token = cookies().get('token')?.value;
  const role = cookies().get('role')?.value;

console.log("token ",token);
console.log("role",role);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const url = req.nextUrl.clone();
  if (role === 'ADMIN' && url.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (role === 'USER' && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/user', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
