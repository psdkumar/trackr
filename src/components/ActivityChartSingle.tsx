import { off } from 'process'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useBreakpoint from 'use-breakpoint'

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export default function ActivityChartSingle({ activityChartData }) {
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS, 'xs')

  return (
    <div className="overflow-scroll">
      <LineChart
        width={breakpoint === 'xs' ? 400 : breakpoint === 'sm' ? 600 : 800}
        height={breakpoint === 'xs' ? 400 : 500}
        data={activityChartData}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
        style={{ width: '100%', height: '100%' }}
        className="mt-5"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: 'Cumulative Activity Count',
            angle: 270,
          }}
        />
        <Tooltip />
        {/* <Legend
          width={breakpoint === 'xs' ? 500 : breakpoint === 'sm' ? 800 : 1000}
          align="center"
        /> */}
        <Line
          name="activity count"
          type="linear"
          dataKey="count"
          stroke="blue"
        ></Line>
      </LineChart>
    </div>
  )
}
