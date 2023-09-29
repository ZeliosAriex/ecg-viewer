import { VictoryTheme } from 'victory'

const colors = {
  white: '#FFF',
  yellow400: '#F7F703',
  gray700: '#404040',
  gray600: '#606060',
  gray400: '#939393',
}

export const lineGraphTheme = VictoryTheme.grayscale
export const lineGraphStyles = {
  containerPadding: { top: 50, bottom: 50, left: 130, right: 100 },
  container: { background: { fill: colors.gray700 } },
  line: {
    data: { stroke: colors.yellow400, strokeWidth: 0.5, opacity: 1 },
  },
  xAxis: {
    axis: { stroke: colors.gray600 },
    axisLabel: { fontSize: 20, padding: 30, fill: colors.white },
    grid: { stroke: colors.gray600, strokeDasharray: '' },
    ticks: { stroke: colors.gray600, size: 12 },
    tickLabels: {
      fontSize: 8,
      padding: 5,
      size: 4,
      fill: colors.white,
    },
  },
  yAxis: {
    axis: { stroke: colors.gray600, fill: colors.white },
    axisLabel: {
      fontSize: 7,
      padding: -20,
      fill: colors.yellow400,
    },
    grid: { stroke: colors.gray600, strokeDasharray: '' },
    ticks: { stroke: colors.white, size: 0 },
    tickLabels: {
      fontSize: 8,
      padding: -4,
      fill: colors.gray400,
      textAnchor: 'start',
    },
  },
}
