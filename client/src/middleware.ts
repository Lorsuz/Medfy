import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./utils/api";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("@medfy:token")?.value;
  const parseToken = token ? parseJwt(token) : null;

  const privateRoutes = ["/app"];
  const adminRoutes = ["/app/a"];

  // Caso o token não exista ou seja inválido
  if (!token || !parseToken) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  const cookieLastSave = req.cookies.get("@medfy:lastSave")?.value;

  const res = NextResponse.next();

  if (
    !cookieLastSave ||
    new Date(cookieLastSave).getTime() + 360_000 < new Date().getTime()
  ) {
    res.cookies.set("@medfy:lastSave", new Date().toISOString());

    try {
      const response = await api.get("/user/@me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data) {
        console.log(response.data);
        const { id, email, name, profileImage, role } = response.data;

        res.cookies.set(
          "@medfy:user",
          JSON.stringify({
            id,
            email,
            name,
            profileImage,
            isAdmin: role === "admin",
          })
        );
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  if (adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (parseToken.isAdmin) {
      return res;
    } else {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  // Permite acesso às rotas privadas
  if (privateRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return res;
  }

  return NextResponse.redirect(new URL("/auth/sign-in", req.url));
}

export const config = {
  matcher: ["/app/:path*"],
};

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(Buffer.from(base64Payload, "base64").toString());
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error);
    return null;
  }
}
