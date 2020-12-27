import { Activity } from './../types/index'
import { useQuery } from 'react-query'

export function useActivities() {
  const url = '/api/fauna/fetch-activities'

  const { isLoading, error, data: response } = useQuery('activities', () =>
    fetch(url).then((res) => res.json())
  )

  let activities: Activity[] = []

  if (isLoading || error) {
    return { activities, isLoading, error }
  }

  activities = response.data.map((activity) => ({
    id: activity.ref['@ref'].id,
    title: activity.data.title,
    description: activity.data.description,
  }))

  return { activities, isLoading, error }
}

export function useActivity(id: string) {
  const url = `/api/fauna/fetch-activity?id=${id}`

  const { isLoading, error, data: response } = useQuery(['activity', id], () =>
    fetch(url).then((res) => res.json())
  )

  let activity: Activity

  if (isLoading || error) {
    return { activity, isLoading, error }
  }

  let res = JSON.parse(JSON.stringify(response))
  activity = {
    id: res.ref['@ref'].id,
    title: res.data.title,
    description: res.data.description,
  }

  return { activity, isLoading, error }
}

export function useUpdateActivity(activity1: Activity) {
  const url = '/api/fauna/update-activity'

  const { isLoading, error, data: response } = useQuery(
    ['updateActivity', activity1],
    () => fetch(url).then((res) => res.json())
  )

  let activity: Activity

  if (isLoading || error) {
    return { activity, isLoading, error }
  }

  let res = JSON.parse(JSON.stringify(response))
  activity = {
    id: res.ref['@ref'].id,
    title: res.data.title,
    description: res.data.description,
  }

  return { activity, isLoading, error }
}
