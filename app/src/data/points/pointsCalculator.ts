import { differenceInSeconds } from "date-fns";

const MAX_CHARS = 240
const RAND_MIN = 1
const RAND_MAX = 1000
const MAX_TIME_SECONDS = 3600

const CHAR_MODIFIER = 0.2
const TIME_MODIFIER = 0.3
const RAND_MODIFIER = 0.5

export function pointsCalculator(
  text: string, 
  timeStarted: Date, 
  timeEnded: Date, 
  ranGenerator: (min: number, max: number) => number) {
  
  const charLength = text.length
  const timeTakenSeconds = differenceInSeconds(timeEnded, timeStarted)
  const randomAttr = ranGenerator(RAND_MIN, RAND_MAX)

  const charPercent = (charLength > MAX_CHARS ? 1 : (charLength / MAX_CHARS)) * CHAR_MODIFIER
  const timeTakenSecondsPercent = (timeTakenSeconds > MAX_TIME_SECONDS ? 1 : (timeTakenSeconds / MAX_TIME_SECONDS)) * TIME_MODIFIER
  const randomPercent = (randomAttr / RAND_MAX) * RAND_MODIFIER

  const total = (charPercent + randomPercent + timeTakenSecondsPercent) * 100

  return Math.round(total)
}

function random(min: number,max: number) {
  return Math.floor(Math.random()*(max-min+1)+min);
}