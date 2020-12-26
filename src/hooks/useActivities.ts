import { useQuery } from 'react-query'

export function useActivities() {
  const { isLoading, error, data: response } = useQuery('activities', () =>
    fetch('/api/fauna/fetch-activities').then((res) => res.json())
  )

  const activities = response?.data?.map((x) => x.data) ?? []

  return { activities, isLoading, error }
}
