import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import format from 'date-fns/format'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from '../assets/colors';
import { Todo } from '../data/todos/todolist';
import { TIME_FORMAT } from '../common/date';

interface Props {
  todo: Todo
}

export function TodoItem(props: Props) {
  const isComplete = Boolean(props.todo.timeEnded)
  return (
    <View style={styles.container}>
      { isComplete ? 
        <View style={styles.completeIcon}>
          <FontAwesome5 size={20} name={'check'} />
        </View> :
        undefined
      }
      <View>
        <Text style={styles.todoText}>{props.todo.text}</Text>
        <Text style={styles.dateText}>{format(props.todo.timeStarted, TIME_FORMAT)}</Text>
        { props.todo.points ? 
          <Text style={styles.pointsText}>{`Points earned: ${props.todo.points}`}</Text> : 
          undefined
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 50,
    paddingRight: 20,
    flexDirection: 'row',
    backgroundColor: AppColors.todoListItem
  },
  completeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20
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
  },
  pointsText: {
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.pointsColor
  }
})