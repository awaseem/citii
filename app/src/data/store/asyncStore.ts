import { TodoAction, TodoListActions, setTodo, TodoListState } from "../todos/todoList";
import { Dispatch, Store } from "redux";
import { AsyncStorage } from "react-native";

export const STORE_KEY = '@Citii:state'

export function storageMiddleware(store: Store) {
  return (next: Dispatch) => {
    return (action: TodoAction) => {
      const result = next(action)
      switch (action.type) {
        case TodoListActions.ADD:
        case TodoListActions.COMPLETE:
        case TodoListActions.REMOVE:
          // Don't wait for the store to respond, just write and ignore the errors
          const state = store.getState()
          AsyncStorage.setItem(STORE_KEY, JSON.stringify(state))
          break
        default:
          break
      }
      return result
    }
  }
}

export function getStateFromStore() {
  return async (dispatch: Dispatch) => {
    // Todo: handle errors and loading gracefully 
    try {
      const stateString = await AsyncStorage.getItem(STORE_KEY)
      if (!stateString) {
        return
      }
      const state = JSON.parse(stateString) as TodoListState | undefined
      if (state) {
        dispatch(setTodo(state))
      }
    } catch (error) {
      console.log(error)
    }
  }
}