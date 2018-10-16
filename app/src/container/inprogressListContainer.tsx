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

interface SwipeListRenderItem {
  item: Todo,
  index: number
}

interface Props {
  todos: Todo[],

  addTodo: (text: string) => void,
  removeTodo: (ID: string) => void,
  completeTodo: (ID: string) => void
}

function InProgressListContainer(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text={'Today\'s Tasks'} />
      </View>
      <View style={styles.tasksRemainingContainer}>
        <Subtitle text={`${props.todos.length} tasks remaining`} />
      </View>
      <View style={styles.hrContainer}>
        <Hr />
      </View>
      <SwipeListView
          style={styles.todoLists}
          useFlatList
          data={props.todos}
          renderItem={ ({ item }: SwipeListRenderItem) => (
            <TodoItem todo={item} />
          )}
          renderHiddenItem={ ({ item }: SwipeListRenderItem) => (
            <TodoItemBack 
              onDelete={() => props.removeTodo(item.ID)} 
              onComplete={() => props.completeTodo(item.ID)} 
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
            text => text.length > 0 ? props.addTodo(text) : undefined
          );
        }} inverted color={AppColors.addButton} text={'+'} />
      </View>
    </View>
  );
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