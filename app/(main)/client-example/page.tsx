import { SessionProvider } from "next-auth/react";
import ClientExample from "./client-example";



export default async function ClientPage() {
    return (
        <SessionProvider>
            <ClientExample />
        </SessionProvider>
    )
}
