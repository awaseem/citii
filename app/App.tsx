import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { todoListReducer } from './src/data/todos/todoList';
import Navigator from './src/container/navigator';
import { NavBar } from './src/container/navBar';
import InprogressListContainer from './src/container/inprogressListContainer';
import { View, StyleSheet } from 'react-native';
import CompletedDatesListContainer from './src/container/completedDatesListContainer';
import { CompletedListContainer } from './src/container/completedListContainer';
import { storageMiddleware, getStateFromStore } from './src/data/store/asyncStore';
import { CityContainer } from './src/container/cityContainer';

const middlewares = [thunk, storageMiddleware]

const store = createStore(todoListReducer, applyMiddleware(...middlewares))

// fetch the current state from the store
store.dispatch(getStateFromStore() as any)

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
  [RouteNames.city]: CityContainer
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
          <Navigator 
            ref={(nav) => nav ? this.navigator = nav : undefined } 
            defaultRouteName={RouteNames.city.toString()} 
            routes={routes} 
          />
          <NavBar 
            icons={{
              [RouteNames.completed]: this.onPressNavBar(RouteNames.completed),
              [RouteNames.inProgress]: this.onPressNavBar(RouteNames.inProgress),
              [RouteNames.city]: this.onPressNavBar(RouteNames.city)
            }}
            selected={this.state.selected}
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