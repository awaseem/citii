export interface Todo {
  ID: string;
  text: string;
  timeStarted: Date
  timeEnded?: Date
}

export interface TodoListState {
  inProgressTodoList: Todo[]
  completedTodoList: Todo[]
}

export interface AddTodoAction {
  type: TodoListActions.ADD,
  payload: Todo
}

export interface RemoveTodoAction {
  type: TodoListActions.REMOVE,
  payload: string
}

export interface CompleteTodoAction {
  type: TodoListActions.COMPLETE,
  payload: string
}

export type TodoAction = AddTodoAction | RemoveTodoAction | CompleteTodoAction

// -- Constants --

enum TodoListActions {
  ADD,
  REMOVE,
  COMPLETE
}

export const initialTodoListState: TodoListState = {
  inProgressTodoList: [],
  completedTodoList: []
}

// -- Action Creators --

export function addTodo(todo: Todo): AddTodoAction {
  return {
    type: TodoListActions.ADD,
    payload: todo
  }
}

export function removeTodo(todoID: string): RemoveTodoAction {
  return {
    type: TodoListActions.REMOVE,
    payload: todoID
  }
}

export function completeTodo(todoID: string): CompleteTodoAction {
  return {
    type: TodoListActions.COMPLETE,
    payload: todoID
  }
}

// -- Reducer -- 

export function todoListReducer(state: TodoListState = initialTodoListState, action: AddTodoAction | RemoveTodoAction | CompleteTodoAction): TodoListState {
  switch (action.type) {
    case TodoListActions.ADD:
      break;
    case TodoListActions.COMPLETE:
      break;
    case TodoListActions.REMOVE:
      break;
    default:
      return state
  }
}