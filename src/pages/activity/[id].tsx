import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { IconLoader } from 'tabler-icons'
import ActivityHeading from '../../components/ActivityHeading'
import Error from 'next/error'

export default function ActivityDetails() {
  const router = useRouter()
  const id = router.query.id
  const { isLoading, data: response } = useQuery(
    ['activity', router.query.id],
    () => fetch(`/api/fauna/fetch-activity?id=${id}`).then((res) => res.json())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <IconLoader className="animate-spin mr-3 text-brand-600" size={52} />
      </div>
    )
  }

  if (!response.ok) {
    console.dir(response)
    return <Error statusCode={response.statusCode} />
  }

  const activity = response.activity

  return (
    <>
      <Head>
        <title>Trackr - Activity</title>
      </Head>
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mt-5">
          <ActivityHeading activity={activity} />
        </div>

        <h2 className="py-5 text-sm font-medium uppercase text-brand-600">
          Activity Details
        </h2>
        <pre className="overflow-scroll">
          {JSON.stringify({ activity }, null, 2)}
        </pre>
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
