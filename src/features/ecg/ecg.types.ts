export interface ParsedEcgData {
  Time: number
  1: number
  2: number
  3: number
  4: number
  5: number
}
export interface EcgData {
  time: number
  value: number
}

export type Domain = [number, number]
