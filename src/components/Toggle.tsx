import classNames from 'classnames'

export default function Component({
  title,
  description,
  isSelected,
  setIsSelected,
}: {
  title: string
  description: Array<string>
  isSelected: boolean
  setIsSelected: (a: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex-grow flex flex-col" id="toggleLabel">
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <span className="text-sm leading-normal text-gray-500">
          {isSelected ? description[0] : description[1]}
        </span>
      </span>
      <button
        type="button"
        aria-pressed="false"
        aria-labelledby="toggleLabel"
        onClick={() => setIsSelected(!isSelected)}
        className={classNames(
          isSelected ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            isSelected ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        ></span>
      </button>
    </div>
  )
}
