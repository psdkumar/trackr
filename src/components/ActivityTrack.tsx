import ActivityChart from './ActivityChart'
import classNames from 'classnames'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file for date range picker
import 'react-date-range/dist/theme/default.css' // theme css file for date range picker
import { Button } from 'coderplex-ui'
import { ArrowClockwise, Calendar, ChartLineUp } from 'phosphor-react'
import { Activity, ActivityState } from '@/types'

export default function ActivityTrack({ activity }: { activity: Activity }) {
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
  const [startDate, setStartDate] = useState(state[0].startDate)
  const [endDate, setEndDate] = useState(state[0].endDate)
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)

  return (
    <>
      {activity.state !== ActivityState.INACTIVE && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-base text-gray-700">
              Cumulative Activity Tracking Chart
            </h2>
            <div className="flex space-x-2 justify-around mt-2 sm:mt-0">
              <Button
                variant="outlined"
                variantColor="brand"
                leadingIcon={(props) => (
                  <Calendar {...props} weight="duotone" />
                )}
                onClick={() => {
                  setShowDateRangePicker(!showDateRangePicker)
                }}
              >
                Range
              </Button>
              <Button
                variant="outlined"
                variantColor="brand"
                leadingIcon={(props) => (
                  <ArrowClockwise {...props} weight="bold" />
                )}
                onClick={() => {
                  setState(defaultRange)
                }}
              >
                Reset
              </Button>
              <Button
                variant="solid"
                variantColor="brand"
                leadingIcon={(props) => (
                  <ChartLineUp {...props} weight="bold" />
                )}
                onClick={() => {
                  setStartDate(state[0].startDate)
                  setEndDate(state[0].endDate)
                  setShowDateRangePicker(false)
                }}
              >
                Track
              </Button>
            </div>
          </div>

          <div
            className={classNames('flex justify-center py-5', {
              hidden: !showDateRangePicker,
            })}
          >
            <DateRange
              editableDateInputs={true}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              ranges={state}
              onChange={(item) => setState([(item as any).selection])}
              className="overflow-scroll"
            />
          </div>
          <ActivityChart
            activity={activity}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      )}
    </>
  )
}
