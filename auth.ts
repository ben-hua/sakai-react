import NextAuth from "next-auth";

import { type JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Keycloak from "next-auth/providers/keycloak";

import type { NextAuthConfig } from "next-auth";


async function logoutFromProvider(token: JWT) {
    const { provider, id_token } = token;

    if (provider == "keycloak") {
        try {
            // Add the id_token_hint to the query string
            const params = new URLSearchParams();
            params.append('id_token_hint', id_token);
            const logoutUrl = new URL(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`)
            logoutUrl.searchParams.set("id_token_hint", token.id_token)
            const { status, statusText } = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`);
        }
        catch (e: any) {
            console.error("Unable to logout from keycloak", e)
        }
    }

}


export const config = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [
        GitHub,
        Keycloak({
            issuer: process.env.KEYCLOAK_ISSUER,
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        async jwt({ token, account }) {
            if (account) {
                token.id_token = account.id_token
                token.provider = account.provider
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        }
    },
    events: {
        signOut: ({ session, token }) => logoutFromProvider(token)
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

