import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import format from 'date-fns/format'
import { AppColors } from '../assets/colors';
import { Todo } from '../data/todos/todolist';

const TIME_FORMAT = 'ddd, MMM D'

interface Props {
  todo: Todo
}

export function TodoItem(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.todoText}>{props.todo.text}</Text>
      <Text style={styles.dateText}>{format(props.todo.timeStarted, TIME_FORMAT)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 50,
    paddingRight: 20,
    backgroundColor: AppColors.todoListItem
  },
  todoText: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.headerColor
  },
  dateText: {
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.subHeaderColor
  }
})