import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const userRes = await fetch(
            `${process.env.SERVER_HOST}/auth/get-user`,
            {
              method: "POST",
              body: JSON.stringify({ email }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await userRes.json();
          const checkUser = await fetch(
            `${process.env.SERVER_HOST}/auth/check-user`,
            {
              method: "POST",
              body: JSON.stringify({ email }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const exist = (await checkUser.json()) as unknown as {
            isExist: boolean;
          };
          if (!exist.isExist || user.password !== password) return null;
          return user;
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