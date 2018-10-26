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
import tinycolor from 'tinycolor2'
import { Window } from './windows';
import { FlatRoof } from './flatRoof';
import { Separator } from './separator';
import { GarageDoor } from './garageDoor';
import { Door } from './door';
import { Bricks } from './bricks';

interface Props {
  stories: number
}

export function Building() {
  return (
    <View>
      <Svg height={240} width={150}>
        <Rect
          x="5"
          y="0"
          width="140"
          height="250"
          fill="#DB4C40" 
        />
        <Bricks minX={20} maxX={100} minY={20} maxY={200} numberOfBricks={6} buildingColor={'#DB4C40'} />
        <FlatRoof x={0} y={0} />
        <Window x={20} y={30} />
        <Window x={100} y={30} />
        <Separator x={0} y={80} />
        <Window x={20} y={105} />
        <Window x={100} y={105} />
        <Separator x={0} y={155} />
        <GarageDoor x={20} y={190} />
        <Door x={100} y={205} />
      </Svg>
    </View>
  )
}