import { NextResponse } from "next/server";

function hasUserToken(request) {
  const token = request.cookies.get("user_token");
  return token && token.value;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userToken = hasUserToken(request);

  if (
    userToken &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/profile")) {
    if (!userToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/sign-in", "/sign-up"],
};
