import Link from 'next/link'
import classNames from 'classnames'
import { Activity } from 'phosphor-react'

export default function Logo({
  className = '',
  size = 32,
}: {
  className?: string
  size?: number
}) {
  return (
    <Link href="/" passHref={true}>
      <a className="flex items-center cursor-pointer">
        <Activity size={size} className="text-indigo-600" />
        <span
          className={classNames(
            'ml-2 text-xl font-semibold text-brand-600',
            className
          )}
        >
          Trackr
        </span>
      </a>
    </Link>
  )
}
