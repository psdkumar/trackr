import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { Button, Input, TextArea } from 'coderplex-ui'
import { useMutation, useQueryClient } from 'react-query'
import { Activity } from '../types'

export default function UpdateActivityModal({
  isOpen,
  setIsOpen,
  activity,
}: {
  isOpen: boolean
  setIsOpen: (a: boolean) => void
  activity: Activity
}) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(activity.title)
  const [description, setDescription] = useState(activity.description)
  const id = activity.id

  const { isError, isLoading, isSuccess, mutate, data: response } = useMutation(
    ['update_activity', id],
    () =>
      fetch('/api/fauna/update-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, description }),
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['activity', id])
      },
    }
  )

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </Transition>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mt-3 sm:mt-5">
                <h3
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                  id="modal-headline"
                >
                  Update the activity
                </h3>
                <div className="mt-2 space-y-4">
                  <Input
                    id="title"
                    label="Title"
                    placeholder="Sample Activity"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextArea
                    id="description"
                    label="Description"
                    placeholder="Brief description of your activity"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3 sm:space-y-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <Button
                variant="solid"
                variantColor="brand"
                onClick={() => {
                  mutate()
                  setTitle('')
                  setDescription('')
                  setIsOpen(false)
                }}
                isFullWidth={true}
                className="sm:col-start-2"
              >
                Update
              </Button>
              <Button
                variant="outlined"
                variantColor="brand"
                onClick={() => setIsOpen(false)}
                isFullWidth={true}
              >
                Cancel
              </Button>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
