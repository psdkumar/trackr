import faunadb from 'faunadb'
import Link from 'next/link'
import { Activity } from '../../types'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
})

export default function ActivityDetails({ activity }) {
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

export async function getServerSideProps(context) {
  let response: any = await client.query(
    q.Get(q.Ref(q.Collection('activities'), context.params.id))
  )
  response = JSON.parse(JSON.stringify(response))
  const activity: Activity = {
    id: response.ref['@ref'].id,
    title: response.data.title,
    description: response.data.description,
  }

  return {
    props: { activity },
  }
}
