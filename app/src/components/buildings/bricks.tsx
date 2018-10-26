import React from 'react'
import { Rect } from 'react-native-svg';
import tinycolor from 'tinycolor2';
import { random } from '../../data/points/pointsCalculator';
import shortid from 'shortid';

interface Props {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  numberOfBricks: number,
  buildingColor: string
}

export function Bricks(props: Props) {
  const bricks = [...Array(props.numberOfBricks).keys()]
    .map(() =>     
      <Rect
        key={shortid.generate()}
        x={random(props.minX, props.maxX)} 
        y={random(props.minY, props.maxY)} 
        width={20} 
        height={10} 
        fill={tinycolor(props.buildingColor).lighten(10).toString()} 
      />
    )
  return (
    <>
      {bricks}
    </>
  )
}
