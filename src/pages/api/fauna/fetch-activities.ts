import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
})

const FaunaCreateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('activities'))),
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
            }
          )
        )
      )
    )
    res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong!!!' })
  }
}

export default FaunaCreateHandler
