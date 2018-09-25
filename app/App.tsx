/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Header } from './src/components/header';
import { Subtitle } from './src/components/subtitle';
import { Hr } from './src/components/hr';
import { TodoItem } from './src/components/todoItem';
import { Todo } from './src/data/todos/todolist';
import { TodoItemBack } from './src/components/todoItemBack';
import { AppColors } from './src/assets/colors';
import { Button } from './src/components/button';

interface SwipeListRenderItem {
  item: Todo,
  index: number
}

const todos = [
  {
    ID: 'some ID',
    text: 'Buy Milk',
    timeStarted: new Date()
  },
  {
    ID: 'some ID 2',
    text: 'Finish task one',
    timeStarted: new Date()
  },
  {
    ID: 'some ID 3',
    text: 'Finish task two because god damn this is a really big ass string',
    timeStarted: new Date()
  }
]

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header text={'My Tasks'} />
        </View>
        <View style={styles.tasksRemainingContainer}>
          <Subtitle text={'3 tasks remaining'} />
        </View>
        <View style={styles.hrContainer}>
          <Hr />
        </View>
        <SwipeListView
            style={styles.todoLists}
            useFlatList
            data={todos}
            renderItem={ ({ item }: SwipeListRenderItem) => (
              <TodoItem todo={item} />
            )}
            renderHiddenItem={ ({ item }: SwipeListRenderItem) => (
              <TodoItemBack onDelete={() => undefined} onComplete={() => undefined} />
            )}
            previewRowKey={''}
            keyExtractor={(item: Todo) => item.ID}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
        <View style={styles.buttonContainer}>
          <Button inverted color={AppColors.addButton} text={'+'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
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
