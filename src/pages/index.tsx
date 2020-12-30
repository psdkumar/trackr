import { HomePage, Loader, Login } from '@/components'
import { GetServerSideProps } from 'next'
import { csrfToken, useSession } from 'next-auth/client'

export default function Home({ csrfToken, callbackUrl }) {
  const [session, loading] = useSession()

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {session ? (
        <HomePage />
      ) : (
        <Login csrfToken={csrfToken} callbackUrl={callbackUrl} />
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await csrfToken(context),
      callbackUrl: context.query.callbackUrl ?? '/',
    },
  }
}
