import { addSeconds } from "date-fns";
import { pointsCalculator } from "../pointsCalculator";

describe('pointsCalculator tests', () => {
  
  const timeStarted = new Date()

  it('should work with proper attributes', () => {
    const text = 'hello world'
    const timeEnded = addSeconds(timeStarted, 30) 
    const randomGen = () => 400
    
    const expected = 21
    const actual = pointsCalculator(text, timeStarted, timeEnded, randomGen)

    expect(actual).toBe(expected)
  })

  it('should work and return zero for no properties', () => {
    const text = ''
    const randomGen = () => 1
    
    const expected = 0
    const actual = pointsCalculator(text, timeStarted, timeStarted, randomGen)

    expect(actual).toBe(expected)
  })

  it('should work and return 100 for everything maxed out', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu'
    const timeEnded = addSeconds(timeStarted, 3600)
    const randomGen = () => 1000
    
    const expected = 100
    const actual = pointsCalculator(text, timeStarted, timeEnded, randomGen)

    expect(actual).toBe(expected)
  })

  it('should work and return 100 even if the values are over the max', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pellentesque eu'
    const timeEnded = addSeconds(timeStarted, 459493453487)
    const randomGen = () => 1000
    
    const expected = 100
    const actual = pointsCalculator(text, timeStarted, timeEnded, randomGen)

    expect(actual).toBe(expected)
  })

})