import React from 'react'
import { Rect, Line } from 'react-native-svg';
import { AppColors } from '../../assets/colors';

interface Props {
  x: number,
  y: number
}

export function GarageDoor(props: Props) {
  return (
    <>
      <Rect
        x={props.x}
        y={props.y}
        width="50"
        height="130"
        strokeWidth="2"
        stroke={AppColors.garageDoorBorderColor}
        fill={AppColors.garageDoorColor}
      />
      <Line
        x1={props.x}
        x2="70"
        y={props.y + 10}
        stroke={AppColors.garageDoorBorderColor}
        strokeWidth="1"
      />  
      <Line
        x1={props.x}
        x2="70"
        y={props.y + 20}
        stroke={AppColors.garageDoorBorderColor}
        strokeWidth="1"
      /> 
      <Line
        x1={props.x}
        x2="70"
        y={props.y + 30}
        stroke={AppColors.garageDoorBorderColor}
        strokeWidth="1"
      />
      <Line
        x1={props.x}
        x2="70"
        y={props.y + 40}
        stroke={AppColors.garageDoorBorderColor}
        strokeWidth="1"
      />
    </>
  )
}
