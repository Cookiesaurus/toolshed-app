import { NextResponse } from "next/server";
import { getSession } from "@/actions/actions";
export async function middleware(request) {
  const user = await getSession();
  //user is trying to access admin pages but isn't logged in
  if(request.nextUrl.pathname.includes('admin') && !user?.isLoggedIn){
    return NextResponse.redirect(new URL('/', request.url))
  } 

  //user is trying to access admin pages but doesn't have manager or admin privileges
  if(request.nextUrl.pathname.includes('admin') && user.user?.Privilege_Level < 4){
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|inventory|login|giftcard|sign-up|css).*)',
  ],
}