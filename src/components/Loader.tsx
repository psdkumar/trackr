import { IconLoader } from 'tabler-icons'

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <IconLoader className="animate-spin mr-3 text-brand-600" size={52} />
    </div>
  )
}
