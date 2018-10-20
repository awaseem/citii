import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AppColors } from '../assets/colors';

const TIME_FORMAT = 'ddd, MMM D'

interface Props {
  points?: number
  onComplete: () => void
  onDelete: () => void
}

export function TodoItemBack(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.delete} onPress={props.onDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.complete} onPress={props.onComplete}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.buttonText
  },
  delete: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
    backgroundColor: AppColors.deleteButton
  },
  complete: {
    flex: 1,
    paddingRight: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: AppColors.completeButton
  }
})