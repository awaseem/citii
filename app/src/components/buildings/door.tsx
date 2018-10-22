import React from 'react'
import { Rect } from 'react-native-svg';
import { AppColors } from '../../assets/colors';

interface Props {
  x: number,
  y: number
}

export function Door(props: Props) {
  return (
    <Rect
      x={props.x}
      y={props.y}
      width="25"
      height="40"
      strokeWidth="2"
      stroke={AppColors.windowBorderColor}
      fill={AppColors.doorColor} 
    /> 
  )
}
