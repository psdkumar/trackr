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
      q.Let(
        {
          activityDoc: q.Get(q.Ref(q.Collection('activities'), req.query.id)),
        },
        {
          id: q.Select(['ref', 'id'], q.Var('activityDoc')),
          title: q.Select(['data', 'title'], q.Var('activityDoc')),
          description: q.Select(['data', 'description'], q.Var('activityDoc')),
          visibility: q.Select(['data', 'visibility'], q.Var('activityDoc')),
          state: q.Select(['data', 'state'], q.Var('activityDoc')),
        }
      )
    )
    res.status(200).json({ activity: response, ok: true, statusCode: 200 })
  } catch (error) {
    res.status(error.requestResult.statusCode).json({
      message: 'Something went wrong!!!',
      statusCode: error.requestResult.statusCode,
      ok: false,
    })
  }
}

export default FaunaCreateHandler
