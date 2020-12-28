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
    const { date, activityId } = req.body
    const response = await client.query(
      q.Let(
        {
          activityLogDoc: q.Create(q.Collection('activity_log'), {
            data: {
              date: q.Date(date),
              activityRef: q.Ref(q.Collection('activities'), activityId),
            },
          }),
        },
        {
          id: q.Select(['ref', 'id'], q.Var('activityLogDoc')),
        }
      )
    )
    res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong!!!' })
  }
}

export default FaunaCreateHandler
