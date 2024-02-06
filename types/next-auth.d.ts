import { DefaultJWT } from "@auth/core/jwt";
import "next-auth";

declare module "next-auth" {

    // Extend session to hold the access_token
    interface Session extends DefaultSession {
        accessToken: string
    }

    // Extend token to hold the access_token before it gets put into session
    interface JWT extends DefaultJWT {
        accessToken: string
    }
}
