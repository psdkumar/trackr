import Head from 'next/head'
import React from 'react'
import ActivityList from '../components/ActivityList'
import { useActivities } from '../hooks/useActivities'

export default function Home() {
  const { activities, isLoading, error } = useActivities()

  if (error) {
    return <p>Something went wrong !!!</p>
  }

  return (
    <>
      <Head>
        <title>Trackr - Home</title>
      </Head>
      <div className="flex flex-col min-h-full">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="py-4 sm:py-6 md:py-8">
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
                    <ActivityList.Item
                      key={index}
                      id={activity.id}
                      title={activity.title}
                      description={activity.description}
                    />
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
