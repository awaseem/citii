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
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { todoListReducer } from './src/data/todos/todoList';

import InProgressListContainer from './src/container/inprogressListContainer';

const store = createStore(todoListReducer)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InProgressListContainer />
      </Provider>
    );
  }
}
