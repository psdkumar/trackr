import { Activity } from './../types/index'
import { useQuery } from 'react-query'

export function useActivities() {
  const { isLoading, error, data: response } = useQuery('activities', () =>
    fetch('/api/fauna/fetch-activities').then((res) => res.json())
  )

  const activities: Activity[] =
    response?.data?.map((activity) => ({
      id: activity.ref['@ref'].id,
      title: activity.data.title,
      description: activity.data.description,
    })) ?? []

  return { activities, isLoading, error }
}
