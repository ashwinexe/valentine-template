import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // No password configured — allow all traffic
  if (!password) return NextResponse.next();

  // Already authenticated via cookie
  const authed = request.cookies.get("valentine_auth")?.value;
  if (authed === password) return NextResponse.next();

  // Redirect to unlock page
  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|unlock|api/unlock).*)"],
};
