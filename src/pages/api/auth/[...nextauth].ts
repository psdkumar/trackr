import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiHandler } from 'next'
import faunadb from 'faunadb'
import Fauna from '@/adapters'

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
})

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'user:email',
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  adapter: Fauna.Adapter({ faunaClient }),

  secret: process.env.SECRET,
  pages: {
    signIn: '/',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null, // If set, new users will be directed here on first sign in
  },
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: (user as any).id },
      })
    },
  },
}
