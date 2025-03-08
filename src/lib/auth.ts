import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

// This is a custom session interface that extends the default one
// This is used to add the id and credits fields to the session
declare module "next-auth" { 
    interface Session extends DefaultSession {  
        user: {
            id: string;
            credits: number;
        } & DefaultSession["user"];
    }
}

// This is a custom JWT interface that extends the default one
// This is used to add the id and credits fields to the JWT token
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        credits: number;
    }
}

// This is the NextAuth configuration
// It includes the adapter, secret, providers, and callbacks
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    // The callbacks are used to modify the JWT token and session
    // The JWT callback is used to add the id and credits fields to the JWT token
    // The session callback is used to add the id and credits fields to the session
    callbacks: {
        jwt: async ({ token }) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });
            if (db_user) {
                token.id = db_user.id;
                token.credits = db_user.credits;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.credits = token.credits;
            }
            return session;
        },
    },
    // The secret is used to encrypt the JWT token
    secret: process.env.NEXTAUTH_SECRET as string,
    // The adapter is PrismaAdapter, which is used to connect NextAuth to Prisma
    adapter: PrismaAdapter(prisma),
    // The providers are the authentication providers that NextAuth will use
    providers: [
        GoogleProvider({  // The GoogleProvider is used to enable Google authentication
            // The clientId and clientSecret are the Google OAuth credentials
            // The clientId and clientSecret are stored in the .env.local file
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
};

export const getAuthSession = () => {
    return getServerSession(authOptions);
};