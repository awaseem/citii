import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { AppColors } from '../assets/colors';

interface Props {
  text: string
}

export function Subtitle(props: Props) {
  return (
    <Text style={styles.subtitle}>{props.text}</Text>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.subHeaderColor
  }
})