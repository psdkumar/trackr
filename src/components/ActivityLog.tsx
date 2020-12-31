import classNames from 'classnames'
import { Button, Input } from 'coderplex-ui'
import { useRouter } from 'next/router'
import { Check, X } from 'phosphor-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { IconCircleDashed, IconEdit, IconPower } from 'tabler-icons'
import { Activity, ActivityState } from '../types'

export default function ActivityLog({ activity }: { activity: Activity }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [displayDatePicker, setDisplayDatePicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const today = new Date()
  const [date, setDate] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  )

  const { mutate } = useMutation(
    ['log_activity', activity.id],
    () =>
      fetch('/api/fauna/log-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date, activityId: activity.id }),
      }),
    {
      onSettled: () => {
        setIsSubmitting(false)
      },
      onSuccess: () => {
        setDisplayDatePicker(false)
        queryClient.refetchQueries(['activityLogs', router.query.id])
        toast.success('Your activity has been logged.')
      },
    }
  )

  const {
    isError,
    isLoading,
    isSuccess,
    mutate: updateActivityMutate,
    data: response,
  } = useMutation(
    ['update_activity', activity.id],
    () =>
      fetch('/api/fauna/update-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...activity,
          state: ActivityState.ACTIVE,
        }),
      }),
    {
      onSuccess: () => {
        toast.success('Activity has been activated')
        queryClient.refetchQueries(['activity', activity.id])
        queryClient.refetchQueries('activities')
        queryClient.refetchQueries(['activityLogs', activity.id])
      },
    }
  )

  return (
    <>
      <div className="-ml-4 -mt-2 flex items-center justify-center sm:justify-between flex-wrap sm:flex-nowrap sm:h-10">
        <div className="ml-4 mt-2">
          <h2 className="text-base text-gray-700">
            {activity.state === ActivityState.INACTIVE
              ? 'Activate to start logging and tracking this activity'
              : activity.state === ActivityState.ACTIVE
              ? 'Log your activity completions here'
              : 'Activity is already closed. You cannot log completions for this activity anymore.'}
          </h2>
        </div>
        <>
          {activity.state !== ActivityState.CLOSED && (
            <div className="ml-4 mt-2 w-full sm:w-auto">
              {displayDatePicker ? (
                <div className="space-x-2 flex justify-center items-center">
                  <Input
                    type="date"
                    className={classNames('inline-block')}
                    value={date}
                    hasError={!date}
                    onChange={(e) => {
                      setDate(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-success-600 hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-500"
                    onClick={() => {
                      if (!isSubmitting) {
                        setIsSubmitting(true)
                        mutate()
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <IconCircleDashed className="h-5 w-5 animate-spin" />
                    ) : (
                      <Check className="h-5 w-5" weight="bold" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-danger-600 hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500"
                    onClick={() => {
                      setDisplayDatePicker(false)
                    }}
                  >
                    <X className="h-5 w-5" weight="bold" />
                  </button>
                </div>
              ) : activity.state === ActivityState.ACTIVE ? (
                <Button
                  variant="solid"
                  variantColor="brand"
                  leadingIcon={IconEdit}
                  onClick={() => {
                    setDisplayDatePicker(true)
                  }}
                  isFullWidth={true}
                >
                  Log your activity
                </Button>
              ) : (
                <Button
                  variant="solid"
                  variantColor="brand"
                  leadingIcon={IconPower}
                  onClick={() => {
                    updateActivityMutate()
                  }}
                  isFullWidth={true}
                >
                  Activate
                </Button>
              )}
            </div>
          )}
        </>
      </div>
    </>
  )
}
