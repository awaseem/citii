import React, { StatelessComponent } from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import { Todo } from "../data/todos/todoList";
import { Header } from "../components/header";
import { Subtitle } from "../components/subtitle";
import { Hr } from "../components/hr";
import { TodoItem } from '../components/todoItem';

interface Props {
  date: string,
  todos: Todo[]
}

function _completedListContainer(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text={props.date} />
      </View>
      <View style={styles.tasksRemainingContainer}>
        <Subtitle text={`${props.todos.length} dates have completed tasks`} />
      </View>
      <View style={styles.hrContainer}>
        <Hr />
      </View>
      <FlatList
          style={styles.completedDatesList}
          data={props.todos}
          renderItem={ ({ item }) => (
            <TodoItem todo={item} />
          )}
          keyExtractor={(item) => item.ID}
      />
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
  completedDatesList: {
  },
});

export const CompletedListContainer: StatelessComponent<Props> = _completedListContainer