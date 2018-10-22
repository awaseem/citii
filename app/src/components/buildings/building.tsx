import Svg,{
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import React from 'react';
import { View } from 'react-native';
import { Window } from './windows';
import { FlatRoof } from './flatRoof';
import { Separator } from './separator';
import { GarageDoor } from './garageDoor';
import { Door } from './door';

export function Building() {
  return (
    <View>
      <Svg height={150} width={150}>
        <Rect
          x="0"
          y="0"
          width="150"
          height="150"
          fill="#DB4C40" 
        />
        <FlatRoof x={0} y={0} />
        <Window x={20} y={30} />
        <Window x={100} y={30} />
        <Separator x={0} y={80} />
        <GarageDoor x={20} y={105} />
        <Door x={100} y={115} />
      </Svg>
    </View>
  )
}