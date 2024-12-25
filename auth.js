import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "./lib/db";
import { dbConnect } from "./lib/mongo";
import { userModel } from "./models/user-model";

export const { handlers:{GET,POST}, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: 'jwt',
  },
  providers: [
      CredentialsProvider({
        credentials: {
          email: {},
          password: {}
        },
        async authorize(credentials){
          if(credentials === null) return null;
          await dbConnect();
          try {
            const user = await userModel.findOne({email: credentials?.email});
            if (user) {
              const isMatch = user?.password === credentials.password;

              if (isMatch) {
                return user;
              } else {
                throw new Error("Email or Password is not correct");
              }
            } else {
              throw new Error("User not found");
            }
          } catch (error) {
            throw new Error(error);
          }
        }
      }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
