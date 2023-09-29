import { type ScaleName } from 'victory'

export const SCALE: { x: ScaleName; y: ScaleName } = {
  x: 'linear' as ScaleName,
  y: 'linear' as ScaleName,
}

export const FIELDS = {
  x: { fieldName: 'time', unit: 'ms' },
  y: { fieldName: 'value', unit: 'uV' },
}
