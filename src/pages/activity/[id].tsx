import Link from 'next/link'
import { useActivity } from '../../hooks/useActivities'

export default function ActivityDetails({ id }) {
  const { activity, isLoading, error } = useActivity(id as string)

  if (isLoading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Something went wrong!!!</p>
  }

  return (
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
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.params.id,
    },
  }
}
