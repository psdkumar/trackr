import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import Error from 'next/error'
import ActivityDetail from '../../components/ActivityDetail'
import { signIn, useSession } from 'next-auth/client'
import { Loader } from '@/components'

export default function ActivityDetails() {
  const [session, loading] = useSession()
  const router = useRouter()
  const id = router.query.id
  const { isLoading, data: response } = useQuery(
    ['activity', router.query.id],
    () => fetch(`/api/fauna/fetch-activity?id=${id}`).then((res) => res.json())
  )

  if (loading) {
    return <p>Loading the website...</p>
  }

  if (!session) {
    signIn()
    return
  }

  if (isLoading) {
    return <Loader />
  }
  if (!response.ok) {
    return <Error statusCode={response.statusCode} />
  }

  const activity = response.activity

  return (
    <>
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

ActivityDetails.layoutProps = {
  meta: {
    title: 'Activity',
  },
}
