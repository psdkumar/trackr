import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { IconCheck, IconSelector } from 'tabler-icons'

export default function CustomMenu({ title }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="block truncate">INACTIVE</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <IconSelector color="gray" size={24} />
          </span>
        </button>

        {/*
          Select popover, show/hide based on select state.
    
          For animated transitions, import { Transition } from '@headlessui/react' and wrap the next tag in this component:
          <Transition
            show={isOpen}
            enter=""
            enterFrom=""
            enterTo=""
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          ></Transition>
        */}
        <Transition
          show={isOpen}
          enter=""
          enterFrom=""
          enterTo=""
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {/*
              Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
              Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
            */}
              <li
                id="listbox-item-0"
                role="option"
                className="text-gray-900 cursor-default select-none relative py-2 pl-8 pr-4"
              >
                {/* Selected: "font-semibold", Not Selected: "font-normal" */}
                <span className="font-normal block truncate">ACTIVE</span>

                {/*
                Checkmark, only display for selected option.
                Highlighted: "text-white", Not Highlighted: "text-indigo-600"
              */}
                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                  <IconCheck size={20} />
                </span>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  )
}
