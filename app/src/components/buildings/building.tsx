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
import { View, TouchableOP } from 'react-native';

export function Building() {
  return (
    <View>
      <Svg height={150} width={150}>
       {/*  */}
        <Rect
          x="0"
          y="0"
          width="150"
          height="150"
          fill="#DB4C40" 
        />
        <Rect
          x="0"
          y="0"
          width="150"
          height="20"
          fill="#C6D8D3" 
        />
        <Rect
          x="0"
          y="10"
          width="150"
          height="10"
          fill="#889390" 
        />
        <Rect
          x="20"
          y="30"
          width="25"
          height="40"
          strokeWidth="2"
          stroke="#C6D8D3"
          fill="#077187" 
        />
        <Rect
          x="100"
          y="30"
          width="25"
          height="40"
          strokeWidth="2"
          stroke="#C6D8D3"
          fill="#077187" 
        />
        <Rect
          x="0"
          y="80"
          width="150"
          height="15"
          fill="#C6D8D3" 
        />
        <Rect
          x="20"
          y="105"
          width="50"
          height="130"
          strokeWidth="2"
          stroke="black"
          fill="#B8C5D6" 
        />
        <Line
          x1="20"
          x2="70"
          y="115"
          stroke="#4E545B"
          strokeWidth="1"
        />  
        <Line
          x1="20"
          x2="70"
          y="125"
          stroke="#4E545B"
          strokeWidth="1"
        /> 
        <Line
          x1="20"
          x2="70"
          y="135"
          stroke="#4E545B"
          strokeWidth="1"
        />
        <Line
          x1="20"
          x2="70"
          y="145"
          stroke="#4E545B"
          strokeWidth="1"
        />                                  
        <Rect
          x="100"
          y="115"
          width="25"
          height="40"
          strokeWidth="2"
          stroke="#C6D8D3"
          fill="#66635B" 
        />                                              
      </Svg>
    </View>
  )
}