import { HomePage, Login } from '@/components'
import { GetServerSideProps } from 'next'
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Home({ csrfToken, callbackUrl }) {
  const [session, loading] = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if (loading || !session) {
  //     return
  //   }
  //   router.push(callbackUrl)
  // }, [callbackUrl, loading, router, session])

  if (loading) {
    return <p>loading...</p>
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
