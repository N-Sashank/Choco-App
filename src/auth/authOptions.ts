import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        const data = {
          fname: profile.given_name,
          lname: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          external_id: profile.sub,
          image: profile.picture,
        };
        try {
          const user = await db
            .insert(usersTable)
            .values(data)
            .onConflictDoUpdate({ target: usersTable.email, set: data })
            .returning();
          return {
            ...data,
            name: data.fname,
            id: String(user[0].id),
            role: user[0].role,
          };
        } catch (error) {
          console.log(error);
          return {
            id: "",
          };
        }
        return { id: profile.sub };
      },
    }),
  ],
  callbacks: {
    session(data: any) {
      return data;
    },

    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        (token.role = user.role), (token.id = user.id);
      }
      return token;
    },
  },
};
