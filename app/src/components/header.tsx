import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { AppColors } from '../assets/colors';

interface Props {
  text: string
}

export function Header(props: Props) {
  return (
    <Text style={styles.header}>{props.text}</Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 42,
    fontWeight: '600',
    color: AppColors.headerColor
  }
})