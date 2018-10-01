import React, {Component, StatelessComponent, ComponentClass} from 'react';
import { Provider, ConnectedComponentClass } from 'react-redux';
import { createStore } from 'redux';
import { todoListReducer } from './src/data/todos/todoList';
import Navigator from './src/container/navigator';
import { NavBar } from './src/container/navBar';
import InprogressListContainer from './src/container/inprogressListContainer';
import { View, StyleSheet } from 'react-native';
import CompletedDatesListContainer from './src/container/completedDatesListContainer';
import { CompletedListContainer } from './src/container/completedListContainer';

const store = createStore(todoListReducer)

export enum RouteNames {
  completed = 'calendar-check',
  completedList = 'completedList',
  inProgress = 'list-alt',
  city = 'building'
}

const routes = {
  [RouteNames.completed]: CompletedDatesListContainer,
  [RouteNames.completedList]: CompletedListContainer,
  [RouteNames.inProgress]: InprogressListContainer,
  [RouteNames.city]: InprogressListContainer
}

interface State {
  selected: RouteNames
}

export default class App extends Component<{}, State> {
  navigator: Navigator

  constructor(props: {}) {
    super(props)
    this.state = {
      selected: RouteNames.inProgress
    }
  }

  onPressNavBar(routeName: RouteNames) {
    return () => {
      this.setState({
        selected: routeName
      })
      this.navigator.moveViewStack(routeName)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.appContainer}>
          <NavBar 
            icons={{
              [RouteNames.completed]: this.onPressNavBar(RouteNames.completed),
              [RouteNames.inProgress]: this.onPressNavBar(RouteNames.inProgress),
              [RouteNames.city]: this.onPressNavBar(RouteNames.city)
            }}
            selected={this.state.selected}
          />
          <Navigator 
            ref={(nav) => this.navigator = nav} 
            defaultRouteName={RouteNames.city.toString()} 
            routes={routes} 
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})