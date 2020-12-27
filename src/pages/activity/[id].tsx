import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { IconLoader } from 'tabler-icons'
import { useActivity } from '../../hooks/useActivities'

export default function ActivityDetails() {
  const router = useRouter()
  const { activity, isLoading, error } = useActivity(router.query.id as string)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <IconLoader className="animate-spin mr-3 text-brand-600" size={52} />
      </div>
    )
  }

  if (error) {
    return <p>Something went wrong!!!</p>
  }

  return (
    <>
      <Head>
        <title>Trackr - Activity</title>
      </Head>
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="py-5 text-sm font-medium uppercase text-brand-600">
          Activity Details
        </h2>
        <pre>{JSON.stringify({ activity }, null, 2)}</pre>
        <br />
        <Link href="/">
          <a className="text-brand-600 hover:underline">← Back to home</a>
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}
