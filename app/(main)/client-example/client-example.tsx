"use client"

import { getData } from "@/app/api/client/route";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function ClientExample() {
    const { data: session, status } = useSession()
    const userData = getData();
    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-bold">NextAuth.js - Client Side Rendering Usage</h1>
            <p>
                This page fetches session data client side using the{" "}
                <Link href="https://nextjs.authjs.dev/react#usesession">
                    <code>useSession</code>
                </Link>{" "}
                React Hook.
            </p>
            <p>
                It needs the{" "}
                <Link href="https://react.devreference/nextjs/react/use-client">
                    <code>`use client`</code>
                </Link>{" "}
                directive at the top of the file to enable client side rendering, and
                the{" "}
                <Link href="https://nextjs.authjs.dev/react#sessionprovider">
                    <code>SessionProvider</code>
                </Link>{" "}
                component in{" "}
                <strong>
                    <code>client-example/page.tsx</code>
                </strong>{" "}
                to provide the session data.
            </p>

            {status === "loading" ? (
                <div>Loading...</div>
            ) : (
                <SessionData session={session} />
            )}
        </div>
    )
}

function SessionData({ session }: { session: Session | null }) {
    if (session?.user) {
        return (
            <div className="w-full space-y-2 overflow-auto">
                <h2 className="text-xl font-bold">Current Session Data</h2>
                {Object.keys(session.user).length > 3 ? (
                    <p>
                        In this example, the whole session object is passed to the page,
                        including the raw user object. Our recommendation is to{" "}
                        <em>only pass the necessary fields</em> to the page, as the raw user
                        object may contain sensitive information.
                    </p>
                ) : (
                    <p>
                        In this example, only some fields in the user object is passed to
                        the page to avoid exposing sensitive information.
                    </p>
                )}
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        )
    }

    return (
        <p>
            No session data, please <em>Sign In</em> first.
        </p>
    )
}
