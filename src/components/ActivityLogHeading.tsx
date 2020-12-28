import classNames from 'classnames'
import { Button, Input } from 'coderplex-ui'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { IconEdit } from 'tabler-icons'
import { Activity } from '../types'

export default function ActivityLogHeading({
  activity,
}: {
  activity: Activity
}) {
  const [logActivity, setLogActivity] = useState(false)
  const today = new Date()
  const [date, setDate] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  )
  const [submitButtonText, setSubmitButtonText] = useState('')
  const queryClient = useQueryClient()
  const { isError, isLoading, isSuccess, mutate, data: response } = useMutation(
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
      onSuccess: () => {
        setSubmitButtonText('Submitted')
        setLogActivity(false)
        // queryClient.refetchQueries(['activity', id])
        // queryClient.refetchQueries('activities')
      },
    }
  )

  return (
    <div className="bg-white px-4 py-5 border rounded-t-md border-gray-200 sm:px-6 shadow-sm">
      <div className="-ml-4 -mt-2 flex items-center justify-between sm:justify-between flex-wrap sm:flex-nowrap sm:h-10">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Track your activity
          </h3>
        </div>
        <div className="ml-4 mt-2 w-full sm:w-auto">
          {logActivity ? (
            <div className="space-x-0 sm:space-x-2 flex flex-col sm:inline-block space-y-2 sm:space-y-0">
              <Input
                type="date"
                className={classNames('inline-block')}
                value={date}
                hasError={!date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
              />
              <Button
                type="submit"
                variant="solid"
                variantColor="brand"
                onClick={() => {
                  setSubmitButtonText('Submitting ...')
                  mutate()
                }}
              >
                {submitButtonText}
              </Button>
            </div>
          ) : (
            <Button
              variant="solid"
              variantColor="brand"
              leadingIcon={IconEdit}
              onClick={() => {
                setLogActivity(true)
                setSubmitButtonText('Submit')
              }}
              isFullWidth={true}
            >
              Log your activity
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
