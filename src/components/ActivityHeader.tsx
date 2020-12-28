import { Button, Menu } from 'coderplex-ui'
import { DotsThreeVertical, Pencil, Trash } from 'phosphor-react'
import { useState } from 'react'
import { IconChevronDown } from 'tabler-icons'
import { Activity } from '../types'
import DeleteActivityModal from './DeleteActivityModal'
import UpdateActivityModal from './UpdateActivityModal'

export default function ActivityHeader({ activity }: { activity: Activity }) {
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

      <div className="flex justify-between items-center">
        <div className="flex flex-shrink-0 h-16 w-16 rounded-full bg-brand-600 font-semibold text-2xl text-white justify-center items-center">
          {activity.title.toUpperCase().charAt(0)}
        </div>

        <div className="flex flex-col justify-between ml-4">
          <h1 className="text-xl font-semibold text-gray-700">
            {activity.title}
          </h1>
          <p className="text-md font-medium text-gray-500">
            {activity.description}
          </p>
        </div>

        <div className="ml-auto">
          <Menu
            trigger={
              <>
                <Button
                  className="hidden sm:inline-flex"
                  variant="outlined"
                  variantColor="brand"
                  trailingIcon={IconChevronDown}
                >
                  Actions
                </Button>
                <DotsThreeVertical
                  size={32}
                  className="sm:hidden text-brand-600 cursor-pointer"
                />
              </>
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
    </>
  )
}
