import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../assets/colors';

interface Props {
  text: string
}

export function TextItem(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.todoText}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 50,
    paddingRight: 20,
    backgroundColor: AppColors.todoListItem
  },
  todoText: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.headerColor
  },
})