import { Button, Menu } from 'coderplex-ui'
import { DotsThreeVertical, Pencil, Trash } from 'phosphor-react'
import { useState } from 'react'
import { IconEdit } from 'tabler-icons'
import { Activity } from '../types'
import DeleteActivityModal from './DeleteActivityModal'
import EditActivityModal from './EditActivityModal'

export default function ActivityHeading({ activity }: { activity: Activity }) {
  const [openEditActivityModal, setOpenEditActivityModal] = useState(false)
  const [openDeleteActivityModal, setOpenDeleteActivityModal] = useState(false)

  return (
    <>
      {openEditActivityModal && (
        <EditActivityModal
          isOpen={openEditActivityModal}
          setIsOpen={setOpenEditActivityModal}
          activity={activity}
        />
      )}
      {openDeleteActivityModal && (
        <DeleteActivityModal
          isOpen={openDeleteActivityModal}
          setIsOpen={setOpenDeleteActivityModal}
        />
      )}
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-brand-600 text-white flex justify-center items-center">
                {activity.title.toUpperCase().charAt(0)}
              </div>
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              ></span>
            </div>
          </div>

          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-gray-900">
              {activity.title}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              {activity.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Button
            variant="outlined"
            variantColor="brand"
            leadingIcon={IconEdit}
          >
            Log your activity
          </Button>
          <div className="flex justify-center items-center">
            <Menu
              className="text-brand-600 flex justify-center items-center"
              trigger={
                <DotsThreeVertical
                  size={32}
                  className="text-brand-600 cursor-pointer"
                />
              }
            >
              <Menu.Item
                onClick={() => {
                  setOpenEditActivityModal(true)
                }}
              >
                <Pencil className="w-5 h-5 mr-3 text-info-600" />
                <span className="text-info-600">Edit</span>
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
      </div>
    </>
  )
}
