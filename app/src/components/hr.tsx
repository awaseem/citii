import React from 'react';
import {StyleSheet, View} from 'react-native';
import { AppColors } from '../assets/colors';

export function Hr() {
  return (
    <View
      style={styles.hr}
    />
  )
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: AppColors.hrColor,
    borderBottomWidth: 1,
  }
})