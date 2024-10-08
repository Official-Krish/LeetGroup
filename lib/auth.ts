import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', placeholder: 'Enter Your Username', type: 'text' },
        email: { label: 'email', type: 'text', placeholder: "Enter Your Email" },
        password: { label: 'password', type: 'password', placeholder: "Enter Your Password" },
        leetcodeId: { label: 'leetcodeId', type: 'text', placeholder: "Enter Your Leetcode Id" },
        striverId: { label: 'striver_Id', type: 'text', placeholder: "Enter Your Striver Id" }
      },
      async authorize(credentials) {
        // Check if credentials are provided and defined
        if (!credentials || !credentials.email || !credentials.password || !credentials.username || !credentials.leetcodeId) {
          return null;
        }

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        // Find user by email (or username if email is not present)
        const userDb = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        // If user exists, check password and return user data
        if (userDb) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            userDb.password
          );

          if (isPasswordCorrect) {
            
            return {
                id: String(userDb.id),
                name: userDb.username,
                email: userDb.email,
                leetcodeId: userDb.leetcodeId,
                striver_id : userDb.striver_id
            };
          } else {
            return null; // Invalid password
          }
        }

        // Sign up the user if no user found (i.e., registration)
        if (credentials.username.length < 3 || credentials.password.length < 3) {
          return null; // Username or password too short
        }

        try {
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              username: credentials.username,
              password: hashedPassword,
              leetcodeId: credentials.leetcodeId,
              striver_id : credentials.striverId
            },
          });

          return {
            id: String(newUser.id),
            name: newUser.username,
            email: newUser.email,
            leetcodeId: newUser.leetcodeId,
            striver_id : newUser.striver_id
          };
        } catch (e) {
          console.error(e); 
          return null; 
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt', 
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-secret', 
};
