import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Activity } from '../types'
import ActivityChartSingle from './ActivityChartSingle'

export default function ActivityChart({
  activity,
  startDate,
  endDate,
}: {
  activity: Activity
  startDate: Date
  endDate: Date
}) {
  const [activityChartData, setActivityChartData] = useState([])
  const [allDatesInRange, setallDatesInRange] = useState([])
  const { isLoading, data: response, error } = useQuery(
    ['activityLogs', activity.id],
    () =>
      fetch(`/api/fauna/fetch-activity-logs?id=${activity.id}`).then((res) =>
        res.json()
      )
  )

  useEffect(() => {
    const allDates = getAllDatesInRange({
      startDate,
      endDate,
    })
    setallDatesInRange(allDates)
  }, [endDate, startDate])

  useEffect(() => {
    if (isLoading || error) {
      return
    }

    const chartData = getActivityChartData({
      responseData: response.data,
      allDatesInRange,
    })
    setActivityChartData(chartData)
  }, [allDatesInRange, error, isLoading, response?.data])

  return (
    <>
      <ActivityChartSingle activityChartData={activityChartData} />
    </>
  )
}

export function getAllDatesInRange({ startDate, endDate }) {
  const dates = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    dates.push(formatDate({ date: currentDate }))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

export function formatDate({ date }: { date: Date }) {
  let day = `${date.getDate()}`
  let month = `${date.getMonth() + 1}`
  let year = `${date.getFullYear()}`

  if (day.length < 2) day = '0' + day
  if (month.length < 2) month = '0' + month

  return [year, month, day].join('-')
}

export function getActivityChartData({ responseData, allDatesInRange }) {
  const activityCountMap = {}
  responseData.forEach((data, index) => {
    activityCountMap[data[0]['@date']] = index + 1
  })

  let prevCount = 0
  let currCount = 0
  return allDatesInRange.map((date) => {
    currCount = activityCountMap[date] ? activityCountMap[date] : prevCount
    prevCount = currCount
    return {
      date: date,
      count: currCount,
    }
  })
}
