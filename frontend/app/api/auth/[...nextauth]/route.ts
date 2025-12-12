import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock authentication
                if (credentials?.email === "test@example.com" && credentials?.password === "password") {
                    return { id: "1", name: "Gym Bro", email: "test@example.com" };
                }
                return null; // Login failed
            }
        })
    ],
    pages: {
        signIn: '/auth/signin', // We'll need a custom page or use default
    },
    theme: {
        colorScheme: "dark",
        brandColor: "#ff3366",
        logo: "https://gymprodeals.com/logo.png" // Mock
    }
});

export { handler as GET, handler as POST };
