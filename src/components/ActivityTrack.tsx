import ActivityChart from './ActivityChart'
import { DateRangePicker, DateRange } from 'react-date-range'
import { useState } from 'react'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Button } from 'coderplex-ui'

export default function ActivityTrack({ activity }) {
  const today = new Date()
  const defaultStartDate = addDays(today, -today.getDay())
  const defaultEndDate = addDays(today, 6 - today.getDay())
  const defaultRange = [
    {
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      key: 'selection',
    },
  ]
  const [state, setState] = useState(defaultRange)
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  console.log({ startDate, endDate })

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base text-gray-700">
          Cumulative Activity Tracking Chart
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outlined"
            variantColor="brand"
            onClick={() => {
              setState(defaultRange)
              setStartDate(defaultStartDate)
              setEndDate(defaultEndDate)
            }}
          >
            Reset to default
          </Button>
          <Button
            variant="solid"
            variantColor="brand"
            onClick={() => {
              setStartDate(state[0].startDate)
              setEndDate(state[0].endDate)
            }}
          >
            Track
          </Button>
        </div>
      </div>

      <div className="flex justify-center py-5">
        <DateRangePicker
          editableDateInputs={true}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          ranges={state}
          onChange={(item) => setState([(item as any).selection])}
          className="overflow-scroll"
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
        startDate={startDate}
        endDate={endDate}
      />
    </>
  )
}
