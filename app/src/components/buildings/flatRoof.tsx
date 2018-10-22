import React from 'react'
import { Rect } from 'react-native-svg';
import { AppColors } from '../../assets/colors';
import shortid from 'shortid';

interface Props {
  x: number,
  y: number
}

export function FlatRoof(props: Props) {
  return (
    <>
    <Rect
      key={shortid.generate()}
      x={props.x}
      y={props.y}
      width="150"
      height="20"
      fill={AppColors.flatRoofColor}
    />
    <Rect
      key={shortid.generate()}
      x={props.x}
      y={props.y + 10}
      width="150"
      height="10"
      fill={AppColors.flatRoofShadow}
    />
    </>
  )
}
