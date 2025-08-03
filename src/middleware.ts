import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Дополнительная логика middleware при необходимости
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Временно разрешаем доступ к тестовым страницам без авторизации
        const { pathname } = req.nextUrl;
        
        // Открытые для тестирования пути
        const testPaths = [
          '/test-builder',
          '/bots',
          '/bots/new'
        ];
        
        // Если это тестовый путь или путь начинается с /bots/ - разрешаем
        if (testPaths.some(path => pathname === path) || pathname.startsWith('/bots/')) {
          return true;
        }
        
        // Для остальных путей требуем авторизацию
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Защищаем все роуты в dashboard, но временно открываем /bots и /test-builder
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bots/:path*",
    "/test-builder",
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