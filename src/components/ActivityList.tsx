import { Menu } from 'coderplex-ui'
import Link from 'next/link'
import { DotsThreeVertical, Pencil, Trash } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import DeleteActivityModal from './DeleteActivityModal'
import UpdateActivityModal from './UpdateActivityModal'

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
    <div className={isLoading ? 'animate-pulse' : ''}>
      <h2 className="text-lg font-medium tracking-wide uppercase text-brand-600">
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {children}
      </ul>
    </div>
  )
}

ActivityList.Item = Activity
ActivityList.Skeleton = ActivitySkeleton

function Activity({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) {
  const [openUpdateActivityModal, setOpenUpdateActivityModal] = useState(false)
  const [openDeleteActivityModal, setOpenDeleteActivityModal] = useState(false)

  return (
    <>
      {openUpdateActivityModal && (
        <UpdateActivityModal
          isOpen={openUpdateActivityModal}
          setIsOpen={setOpenUpdateActivityModal}
          activity={{ id: id, title: title, description: description }}
        />
      )}
      {openDeleteActivityModal && (
        <DeleteActivityModal
          isOpen={openDeleteActivityModal}
          setIsOpen={setOpenDeleteActivityModal}
          id={id}
        />
      )}
      <Link href={`/activity/${id}`} passHref={true}>
        <a>
          <li className="flex col-span-1 rounded-md shadow-sm">
            <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-brand-600 rounded-l-md">
              {title.toUpperCase().charAt(0)}
            </div>
            <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {title}
                </p>
                <p className="text-gray-500">{description}</p>
              </div>
              <div
                className="flex flex-shrink-0 pr-2 items-center justify-center "
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
