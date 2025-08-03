import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Дополнительная логика middleware при необходимости
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Защищаем все роуты в dashboard
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bots/:path*",
    "/analytics/:path*",
    "/templates/:path*",
    "/integrations/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/api/bots/:path*",
    "/api/messages/:path*",
    "/api/integrations/:path*",
  ]
};