import { Activity, ActivityState, ActivityVisibility } from '@/types'
import classNames from 'classnames'
import { Menu } from 'coderplex-ui'
import Link from 'next/link'
import { DotsThreeVertical, Pencil, Trash } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import { Badge } from '@/components'
import DeleteActivityModal from './DeleteActivityModal'
import UpdateActivityModal from './UpdateActivityModal'
import { IconEye, IconEyeOff } from 'tabler-icons'

export default function ActivityList({
  title,
  children,
  isLoading = false,
}: {
  title: string
  children: ReactNode
  isLoading?: boolean
}) {
  return (
    <div className={classNames(isLoading && 'animate-pulse', 'pb-24')}>
      <h1 className="text-xl font-semibold uppercase text-brand-600 pb-2 pt-5 text-center">
        {title}
      </h1>
      <ul className="grid grid-cols-1 gap-6 mt-3 lg:gap-x-16 md:grid-cols-2">
        {children}
      </ul>
    </div>
  )
}

ActivityList.Item = ActivityCard
ActivityList.Skeleton = ActivitySkeleton

function ActivityCard({ activity }: { activity: Activity }) {
  const [openUpdateActivityModal, setOpenUpdateActivityModal] = useState(false)
  const [openDeleteActivityModal, setOpenDeleteActivityModal] = useState(false)

  return (
    <>
      {openUpdateActivityModal && (
        <UpdateActivityModal
          isOpen={openUpdateActivityModal}
          setIsOpen={setOpenUpdateActivityModal}
          activity={activity}
        />
      )}
      {openDeleteActivityModal && (
        <DeleteActivityModal
          isOpen={openDeleteActivityModal}
          setIsOpen={setOpenDeleteActivityModal}
          id={activity.id}
        />
      )}
      <Link href={`/activity/${activity.id}`} passHref={true}>
        <a>
          <li className="flex col-span-1 rounded-md shadow-sm">
            <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-brand-600 rounded-l-md">
              {activity.title.toUpperCase().charAt(0)}
            </div>
            <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-gray-200">
              <div className="flex-1 pl-4 py-2 text-sm truncate">
                <div className="flex justify-between">
                  <p className="font-medium text-gray-900 hover:text-gray-600">
                    {activity.title}
                  </p>
                  <div className="flex space-x-2 items-center">
                    {activity.visibility === ActivityVisibility.PUBLIC ? (
                      <IconEye size={14} color="gray" />
                    ) : (
                      <IconEyeOff size={14} color="gray" />
                    )}
                    <Badge
                      label={activity.state}
                      color={
                        activity.state === ActivityState.INACTIVE
                          ? 'info'
                          : activity.state === ActivityState.ACTIVE
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </div>
                </div>
                <p className="text-gray-500">{activity.description}</p>
              </div>
            </div>
            <div
              className="flex flex-shrink-0 pr-2 items-center justify-center bg-white border-r rounded-r-md border-t border-b"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Menu
                trigger={
                  <DotsThreeVertical
                    size={36}
                    className="text-brand-500 hover:text-brand-600 cursor-pointer"
                  />
                }
              >
                <Menu.Item
                  onClick={() => {
                    setOpenUpdateActivityModal(true)
                  }}
                >
                  <Pencil className="w-5 h-5 mr-3 text-info-600" />
                  <span className="text-info-600">Update</span>
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setOpenDeleteActivityModal(true)
                  }}
                >
                  <Trash className="w-5 h-5 mr-3 text-danger-600" />
                  <span className="text-danger-600">Delete</span>
                </Menu.Item>
              </Menu>
            </div>
          </li>
        </a>
      </Link>
    </>
  )
}

function ActivitySkeleton() {
  return (
    <li className="flex col-span-1 rounded-md shadow-sm">
      <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-gray-200 rounded-l-md"></div>
      <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <p className="bg-gray-200 w-24 h-4"></p>
          <p className="bg-gray-200 w-52 h-4 mt-2"></p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            {/* Heroicon name: dots-vertical */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  )
}
