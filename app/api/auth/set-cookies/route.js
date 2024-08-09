'use server'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(request) {
  const { email, token, role } = await request.json();
console.log(email,token);
cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  cookies().set('role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  return new NextResponse('Cookies set successfully', {
    status: 200
  });
}
