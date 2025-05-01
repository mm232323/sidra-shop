import { GetUser } from "@/util/auth-apis";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { phone, password } = credentials as {
          phone: string;
          password: string;
        };
        try {
          const res = await GetUser(phone,false,password)
          if (res.status == 404) return null;
          const user = res.res.user
          user.email = user.phone
          console.log(user)
          return user
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };