import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas protegidas
const adminRoutes = ['/admin'];
const userRoutes = ['/user'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  
  // Redireciona para login se não houver token
  if (!token) {
    if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) ||
        userRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/sign', request.url));
    }
  }

  // Validação opcional (Ex.: decodificar token para verificar permissões)
  if (token) {
    const payload = parseJwt(token); // Implementar parseJwt (verificar claims)

    if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !payload.isAdmin) {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Decodificar JWT (exemplo básico)
function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    return JSON.parse(Buffer.from(base64Payload, 'base64').toString());
  } catch {
    return null;
  }
}
