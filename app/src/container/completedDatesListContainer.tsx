import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { connect } from 'react-redux';

import { TodoListState, CompletedTodos } from "../data/todos/todoList";
import { Header } from "../components/header";
import { Subtitle } from "../components/subtitle";
import { Hr } from "../components/hr";
import { TextItem } from '../components/textItem';

interface Props {
  todos: CompletedTodos
}

function CompletedDatesListContainer(props: Props) {
  const completedTodoDates = Array.from(props.todos.keys());
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text={'Completed'} />
      </View>
      <View style={styles.tasksRemainingContainer}>
        <Subtitle text={`${completedTodoDates.length} dates completed`} />
      </View>
      <View style={styles.hrContainer}>
        <Hr />
      </View>
      <FlatList
          style={styles.completedDatesList}
          data={completedTodoDates}
          renderItem={ ({ item }) => (
            <TextItem text={item} />
          )}
          keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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

function mapStateToProps(state: TodoListState) {
  return {
    todos: state.completedTodos
  }
}

function mapDispatchToProps() {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedDatesListContainer)