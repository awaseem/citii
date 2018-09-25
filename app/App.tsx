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
import {Platform, StyleSheet, View, ScrollView} from 'react-native';
import { Header } from './src/components/header';
import { Subtitle } from './src/components/subtitle';
import { Hr } from './src/components/hr';
import { TodoItem } from './src/components/todoItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Header text={'My Tasks'} />
        <View style={styles.tasksRemainingContainer}>
          <Subtitle text={'3 tasks remaining'} />
        </View>
        <View style={styles.hrContainer}>
          <Hr />
        </View>
        <ScrollView style={styles.todoLists}>
          <TodoItem todo={{
            ID: 'some ID',
            text: 'Buy Milk',
            timeStarted: new Date()
          }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    marginHorizontal: 50,
    backgroundColor: 'white',
  },
  tasksRemainingContainer: {
    paddingVertical: 10
  },
  hrContainer: {
    marginRight: -200,
    paddingTop: 12
  },
  todoLists: {
    paddingTop: 20
  }
});
