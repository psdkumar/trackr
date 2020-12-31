import classNames from 'classnames'

type BadgeColor = 'normal' | 'brand' | 'success' | 'danger' | 'warning' | 'info'

export const BADGE_COLOR_MAPS: Record<BadgeColor, string> = {
  normal: `bg-normal-100 text-normal-800`,
  brand: `bg-brand-100 text-brand-800`,
  success: `bg-success-100 text-success-800`,
  danger: `bg-danger-100 text-danger-800`,
  warning: `bg-warning-100 text-warning-800`,
  info: `bg-info-100 text-info-800`,
}

export default function Badge({
  label,
  color = 'info',
}: {
  label: string
  color?: BadgeColor
}) {
  return (
    <div
      className={classNames(
        BADGE_COLOR_MAPS[color],
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
      )}
    >
      {label}
    </div>
  )
}
