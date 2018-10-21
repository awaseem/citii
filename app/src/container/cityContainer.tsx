import React from 'react';
import {View} from 'react-native';
import { Building } from '../components/buildings/building';

export function CityContainer() {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 100 }}>
      <Building/>
      {/* <Building/> */}
    </View>
  )
}