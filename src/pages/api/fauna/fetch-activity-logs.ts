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
      // q.Map(
      q.Paginate(
        q.Match(
          q.Index('activityLog_by_activityRef'),
          q.Ref(q.Collection('activities'), req.query.id)
        )
      )
      // q.Lambda(
      //   'activityLogRef',
      //   q.Let(
      //     {
      //       activityLogDoc: q.Get(q.Select([1], q.Var('activityLogRef'))),
      //     },
      //     {
      //       date1: q.Select(['data', 'date'], q.Var('activityLogDoc')),
      //     }
      //   )
      // )
      //   q.Lambda(
      //     'activityResult',
      //     q.Get(q.Select([0], q.Var('activityResult')))
      //   )
      // )
    )
    res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong!!!' })
  }
}

export default FaunaCreateHandler
