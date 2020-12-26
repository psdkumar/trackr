import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { Button, Input, TextArea } from 'coderplex-ui'
import { useMutation, useQueryClient } from 'react-query'

export default function CreateActivityModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (a: boolean) => void
}) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { isError, isLoading, isSuccess, mutate, data: response } = useMutation(
    'create_activity',
    () =>
      fetch('/api/fauna/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries('activities')
      },
    }
  )

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
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
                  Create a new activity
                </h3>
                <div className="mt-2">
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
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <Button
                variant="outlined"
                variantColor="brand"
                className="flex justify-center"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                variantColor="brand"
                className="flex justify-center"
                onClick={() => {
                  mutate()
                  setTitle('')
                  setDescription('')
                  setIsOpen(false)
                }}
              >
                Create
              </Button>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
