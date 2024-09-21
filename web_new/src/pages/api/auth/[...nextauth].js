import NextAuth from  "next-auth";
import {authOptions} from "../../../../../web/app/lib/auth";

export default NextAuth(authOptions)