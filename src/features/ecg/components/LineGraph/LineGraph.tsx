import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  createContainer,
} from 'victory'

import {
  FIELDS,
  SCALE,
} from '@/features/ecg/components/LineGraph/LineGraph.const.ts'
import {
  lineGraphStyles,
  lineGraphTheme,
} from '@/features/ecg/components/LineGraph/LineGraph.styles.ts'
import { type Datum } from '@/features/ecg/components/LineGraph/LineGraph.types.ts'
import { type Domain, type EcgData } from '@/features/ecg/ecg.types.ts'

interface LineGraphProps {
  data: EcgData[]
  domain: Domain
}

const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi')

const LineGraph = ({ data, domain }: LineGraphProps) => (
  <VictoryChart
    width={1000}
    height={500}
    scale={SCALE}
    theme={lineGraphTheme}
    padding={lineGraphStyles.containerPadding}
    style={lineGraphStyles.container}
    containerComponent={
      <VictoryZoomVoronoiContainer
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labels={({ datum }: { datum: Datum }) =>
          `Time: ${datum.time} ${FIELDS.x.unit}, Value: ${datum.value} ${FIELDS.y.unit}`
        }
        labelComponent={
          <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />
        }
        zoomDimension='x'
        zoomDomain={{ x: domain }}
      />
    }
  >
    <VictoryAxis
      dependentAxis
      label='ECG'
      tickFormat={(t) => `${Math.round(t)} ${FIELDS.y.unit}`}
      tickCount={10}
      style={lineGraphStyles.yAxis}
    />
    <VictoryLine
      data={data}
      x={FIELDS.x.fieldName}
      y={FIELDS.y.fieldName}
      style={lineGraphStyles.line}
      interpolation='linear'
    />
    <VictoryAxis
      style={lineGraphStyles.xAxis}
      offsetY={50}
      tickFormat={(t) => `${Math.round(t)} ${FIELDS.x.unit}`}
      tickCount={10}
      orientation='top'
    />
    <VictoryAxis
      style={lineGraphStyles.xAxis}
      offsetY={50}
      tickFormat={(t) => `${Math.round(t)} ${FIELDS.x.unit}`}
      tickCount={10}
      orientation='bottom'
    />
  </VictoryChart>
)

export default LineGraph
