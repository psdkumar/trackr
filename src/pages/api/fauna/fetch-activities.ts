import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import faunadb from 'faunadb'
import { getSession } from 'next-auth/client'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
})

const FaunaCreateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getSession({ req })
    const userId = (session.user as any).id
    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('activity_by_userRef'),
            q.Ref(q.Collection('user'), userId)
          )
        ),
        q.Lambda(
          'activityRef',
          q.Let(
            {
              activityDoc: q.Get(q.Var('activityRef')),
            },
            {
              id: q.Select(['ref', 'id'], q.Var('activityDoc')),
              title: q.Select(['data', 'title'], q.Var('activityDoc')),
              description: q.Select(
                ['data', 'description'],
                q.Var('activityDoc')
              ),
              visibility: q.Select(
                ['data', 'visibility'],
                q.Var('activityDoc')
              ),
              state: q.Select(['data', 'state'], q.Var('activityDoc')),
            }
          )
        )
      )
    )
    res.status(201).json((response as any).data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong!!!' })
  }
}

export default FaunaCreateHandler
