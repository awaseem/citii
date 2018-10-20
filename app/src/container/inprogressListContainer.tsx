import React from 'react';
import {StyleSheet, View, AlertIOS} from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Todo, TodoListState, addTodo, removeTodo, completeTodo } from "../data/todos/todoList";
import { Header } from "../components/header";
import { Subtitle } from "../components/subtitle";
import { Hr } from "../components/hr";
import { TodoItem } from "../components/todoItem";
import { TodoItemBack } from "../components/todoItemBack";
import { AppColors } from "../assets/colors";
import { Button } from "../components/button";
import { Dispatch, bindActionCreators } from 'redux';
import { pointsCalculator } from '../data/points/pointsCalculator';

interface SwipeListRenderItem {
  item: Todo,
  index: number
}

interface Props {
  todos: Todo[],

  addTodo: (text: string) => void,
  removeTodo: (ID: string) => void,
  completeTodo: (ID: string, timeEnded: Date, points: number) => void
}

interface State {
  showPointsAlert: boolean,
  points: number
}

class InProgressListContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header text={'Today\'s Tasks'} />
        </View>
        <View style={styles.tasksRemainingContainer}>
          <Subtitle text={`${this.props.todos.length} tasks remaining`} />
        </View>
        <View style={styles.hrContainer}>
          <Hr />
        </View>
        <SwipeListView
            style={styles.todoLists}
            useFlatList
            data={this.props.todos}
            renderItem={ ({ item }: SwipeListRenderItem) => (
              <TodoItem todo={item} />
            )}
            renderHiddenItem={ ({ item }: SwipeListRenderItem) => (
              <TodoItemBack 
                onDelete={() => this.props.removeTodo(item.ID)} 
                onComplete={() => {
                  const timeEnded = new Date()
                  const pointsEarned = pointsCalculator(item.text, item.timeStarted, timeEnded)
                  this.props.completeTodo(item.ID, timeEnded, pointsEarned)
                }} 
              />
            )}
            previewRowKey={''}
            keyExtractor={(item: Todo) => item.ID}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={() => {
            AlertIOS.prompt(
              'New Task',
              'Enter a task you want to accomplish today.',
              text => text.length > 0 ? this.props.addTodo(text) : undefined
            );
          }} inverted color={AppColors.addButton} text={'+'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginLeft: 50
  },
  tasksRemainingContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: 50
  },
  hrContainer: {
    marginLeft: 50,
    paddingTop: 12
  },
  todoLists: {
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 36,
    right: 36
  }
});

function mapStateToProps(state: TodoListState) {
  return {
    todos: state.inProgressTodoList
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return { 
    addTodo: bindActionCreators(addTodo, dispatch),
    removeTodo: bindActionCreators(removeTodo, dispatch),
    completeTodo: bindActionCreators(completeTodo, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InProgressListContainer)