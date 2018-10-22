import React from 'react'
import { Rect } from 'react-native-svg';
import { AppColors } from '../../assets/colors';

interface Props {
  x: number,
  y: number
}

export function Separator(props: Props) {
  return (
    <Rect
      x={props.x}
      y={props.y}
      width="150"
      height="15"
      fill={AppColors.flatRoofColor}
    />
  )
}
