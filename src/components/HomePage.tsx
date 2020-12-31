import { ActivityList, Title } from '@/components'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'

export default function HomePage() {
  const [session, loading] = useSession()
  const userId = (session?.user as any).id
  const { isLoading, error, data: activities } = useQuery(
    ['activities', userId],
    () => fetch(`/api/fauna/fetch-activities`).then((res) => res.json())
  )

  if (error) {
    return <p>Something went wrong !!!</p>
  }

  return (
    <>
      <Title>Home</Title>
      <div className="flex flex-col min-h-full">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="">
              {isLoading ? (
                <ActivityList title="My Activities" isLoading={isLoading}>
                  <ActivityList.Skeleton />
                  <ActivityList.Skeleton />
                  <ActivityList.Skeleton />
                  <ActivityList.Skeleton />
                  <ActivityList.Skeleton />
                </ActivityList>
              ) : (
                <ActivityList title="My Activities">
                  {activities.map((activity, index) => (
                    <ActivityList.Item key={index} activity={activity} />
                  ))}
                </ActivityList>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
