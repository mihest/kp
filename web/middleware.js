import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(request) {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
        // const isVerifyRoute = verifyRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
        const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
        const isAdminRoute = adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))



        if (!token && (isAuthRoute || isAdminRoute/* || isVerifyRoute*/)) {
            const redirectUrl = new URL("/login", request.url);
            redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            return NextResponse.redirect(redirectUrl);
        }

        if (token) {
            // if (!token.email_verified_at && !isVerifyRoute) {
            //     return NextResponse.redirect(new URL("/request-email-verification", request.url));
            // }

            if (isGuestRoute/* || isVerifyRoute*/) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            if(isAdminRoute && token.role !== 'admin') {
                console.log(token.role)
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

const authRoutes = ['/profile'];
const adminRoutes = ['/admin'];
const guestRoutes = ["/forgot-password", "/login", "/password-reset", "/register"];
