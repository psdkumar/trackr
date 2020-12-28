import { Activity } from '../types'
import ActivityChart from './ActivityChart'
import ActivityHeading from './ActivityHeading'
import ActivityTrack from './ActivityTrack'

export default function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <>
      <h1 className="py-5 text-xl text-center uppercase font-semibold text-brand-600">
        Activity Details
      </h1>
      <div className="shadow-md">
        <div className="p-3 bg-white border border-brand-100 rounded-t-lg">
          <ActivityHeading activity={activity} />
        </div>
        <div className="px-3 py-5 bg-white border-l border-r border-b border-brand-100">
          <ActivityTrack activity={activity} />
        </div>
        <div className="px-3 py-5 bg-white border-l border-r border-b border-brand-100">
          <ActivityChart activity={activity} />
        </div>
      </div>
    </>
  )
}
