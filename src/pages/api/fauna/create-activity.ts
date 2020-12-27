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
    const { title, description } = req.body
    const response = await client.query(
      q.Let(
        {
          activityDoc: q.Create(q.Collection('activities'), {
            data: { title, description },
          }),
        },
        {
          id: q.Select(['ref', 'id'], q.Var('activityDoc')),
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
