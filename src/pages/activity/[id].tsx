import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { IconLoader } from 'tabler-icons'
import ActivityHeading from '../../components/ActivityHeader'
import Error from 'next/error'
import ActivityLogHeading from '../../components/ActivityLogHeading'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useBreakpoint from 'use-breakpoint'
import ActivityDetail from '../../components/ActivityDetail'

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function formatDate({ date }: { date: Date }) {
  let day = `${date.getDate()}`
  let month = `${date.getMonth() + 1}`
  let year = `${date.getFullYear()}`

  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month

  return [year, month, day].join('-')
}

export function getAllRangeDates({ startDate, endDate }) {
  const dates = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    dates.push(formatDate({ date: currentDate }))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

export default function ActivityDetails() {
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS, 'xs')
  const router = useRouter()
  const id = router.query.id
  const { isLoading, data: response } = useQuery(
    ['activity', router.query.id],
    () => fetch(`/api/fauna/fetch-activity?id=${id}`).then((res) => res.json())
  )
  const data = [
    { date: '2020-12-22', dheeraj: 1, teja: 1 },
    { date: '2020-12-23', dheeraj: 2, teja: 2 },
    { date: '2020-12-24', dheeraj: 2, teja: 3 },
    { date: '2020-12-25', dheeraj: 3, teja: 4 },
    { date: '2020-12-26', dheeraj: 3, teja: 5 },
    { date: '2020-12-27', dheeraj: 4, teja: 6 },
    { date: '2020-12-28', dheeraj: 5, teja: 7 },
  ]

  const { isLoading: isLogLoading, data: logData, error: logError } = useQuery(
    ['activityLogs', router.query.id],
    () =>
      fetch(`/api/fauna/fetch-activity-logs?id=${id}`).then((res) => res.json())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <IconLoader className="animate-spin mr-3 text-brand-600" size={52} />
      </div>
    )
  }

  if (!response.ok) {
    console.dir(response)
    return <Error statusCode={response.statusCode} />
  }

  const activity = response.activity
  const countMap = {}
  logData?.data?.forEach((data, index) => {
    countMap[data[0]['@date']] = index + 1
  })

  const allDates = getAllRangeDates({
    startDate: new Date('2020-12-01'),
    endDate: new Date('2020-12-31'),
  })

  let prevCount = 0
  let currCount = 0
  const chartData = allDates.map((date) => {
    currCount = countMap[date] ? countMap[date] : prevCount
    prevCount = currCount
    return {
      date: date,
      count: currCount,
    }
  })

  return (
    <>
      <Head>
        <title>Trackr - Activity</title>
      </Head>
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <ActivityDetail activity={activity} />
      </div>
    </>
  )

  return (
    <>
      <Head>
        <title>Trackr - Activity</title>
      </Head>
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h1 className="py-5 text-xl text-center uppercase font-semibold text-brand-600">
          Activity Details
        </h1>

        <div className="mb-5">
          <ActivityHeading activity={activity} />
        </div>

        <div className="bg-white">
          <ActivityLogHeading activity={activity} />
          <div className="overflow-scroll border rounded-b-md border-gray-200">
            <LineChart
              width={
                breakpoint === 'xs' ? 400 : breakpoint === 'sm' ? 600 : 800
              }
              height={breakpoint === 'xs' ? 400 : 500}
              data={chartData}
              margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
              style={{ width: '100%', height: '100%' }}
              className="mt-5"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend
                width={
                  breakpoint === 'xs' ? 500 : breakpoint === 'sm' ? 800 : 1000
                }
                align="center"
              />
              <Line
                name="dheeraj count"
                type="linear"
                dataKey="count"
                stroke="red"
              ></Line>
              {/* <Line
                name="teja count"
                type="natural"
                dataKey="teja"
                stroke="blue"
              ></Line> */}
            </LineChart>
          </div>
        </div>
        <br />
        <Link href="/">
          <a className="text-brand-600 hover:underline">← Back to home</a>
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}
