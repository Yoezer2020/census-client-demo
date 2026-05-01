import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: {
      cidNo: string;
      fullName: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    cidNo: string;
    fullName: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    accessToken: string;
    cidNo: string;
    fullName: string;
  }
}
