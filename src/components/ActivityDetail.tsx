import { Activity } from '../types'
import ActivityHeader from './ActivityHeader'
import ActivityLog from './ActivityLog'
import ActivityTrack from './ActivityTrack'

export default function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <>
      <h1 className="py-5 text-xl text-center uppercase font-semibold text-brand-600">
        Activity Details
      </h1>
      <div>
        <div className="px-3 py-5 bg-white border border-brand-100 rounded-t-lg">
          <ActivityHeader activity={activity} />
        </div>
        <div className="px-3 py-5 bg-white border-l border-r border-b border-brand-100">
          <ActivityLog activity={activity} />
        </div>
        <div className="px-3 py-5 bg-white border-l border-r border-b rounded-b-lg border-brand-100 mb-10">
          <ActivityTrack activity={activity} />
        </div>
      </div>
    </>
  )
}
