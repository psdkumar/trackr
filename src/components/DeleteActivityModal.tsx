import { Transition } from '@headlessui/react'
import { Button } from 'coderplex-ui'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export default function DeleteActivityModal({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean
  setIsOpen: (a: boolean) => void
  id: string
}) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate } = useMutation(
    'delete_activity',
    () =>
      fetch(`/api/fauna/delete-activity?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['activity', id])
        queryClient.refetchQueries('activities')
        router.push('/')
      },
    }
  )

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* Heroicon name: exclamation */}
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Delete the activity
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this activity? All of your
                  data will be permanently removed from our servers. This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              variant="solid"
              variantColor="danger"
              className="m-1 flex justify-center sm:col-start-2"
              isFullWidth={true}
              onClick={() => {
                mutate()
                setIsOpen(false)
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              variantColor="normal"
              className="m-1 flex justify-center"
              onClick={() => setIsOpen(false)}
              isFullWidth={true}
            >
              Cancel
            </Button>
          </div>
        </Transition>
      </div>
    </div>
  )
}
