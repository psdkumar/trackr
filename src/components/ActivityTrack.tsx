import ActivityChart from './ActivityChart'
import { DateRangePicker, DateRange } from 'react-date-range'
import { useState } from 'react'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

export default function ActivityTrack({ activity }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  return (
    <>
      <h2 className="text-base text-gray-700">
        Cumulative Activity Tracking Chart
      </h2>
      <div className="flex justify-center py-5">
        <DateRangePicker
          editableDateInputs={true}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          ranges={state}
          onChange={(item) => setState([(item as any).selection])}
        />
      </div>
      {/* <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={state}
        onChange={(item) => setState([(item as any).selection])}
      /> */}
      <ActivityChart
        activity={activity}
        startDate={new Date('2020-12-01')}
        endDate={new Date('2020-12-31')}
      />
    </>
  )
}
