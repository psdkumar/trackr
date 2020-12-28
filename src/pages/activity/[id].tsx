import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { IconLoader } from 'tabler-icons'
import Error from 'next/error'
import ActivityDetail from '../../components/ActivityDetail'

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
    return <Error statusCode={response.statusCode} />
  }

  const activity = response.activity

  return (
    <>
      <Head>
        <title>Trackr - Activity</title>
      </Head>
      <div className="max-w-6xl px-2 mx-auto sm:px-6 lg:px-8">
        <ActivityDetail activity={activity} />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}
