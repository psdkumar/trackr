import ActivityChart from './ActivityChart'

export default function ActivityTrack({ activity }) {
  return (
    <>
      <h2 className="text-base text-gray-700">
        Cumulative Activity Tracking Chart
      </h2>
      <ActivityChart activity={activity} />
    </>
  )
}
