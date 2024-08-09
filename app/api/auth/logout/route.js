// src/app/api/logout/route.js
'use server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().set('token', '', { path: '/', expires: new Date(0) });
  cookies().set('role', '', { path: '/', expires: new Date(0) });

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
