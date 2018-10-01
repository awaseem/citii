import { todoByID, notTodoByID } from "./todoHelpers";
import shortID from 'shortid'
import { format } from "date-fns";
import { TIME_FORMAT } from "../../common/date";

export interface Todo {
  ID: string;
  text: string;
  timeStarted: Date
  timeEnded?: Date
}

export interface TodoListState {
  inProgressTodoList: Todo[]
  completedTodos: CompletedTodos;
}

export type CompletedTodos = Map<string, Todo[]>;

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
  completedTodos: new Map<string, Todo[]>()
}

// -- Action Creators --

export function addTodo(text: string): AddTodoAction {
  return {
    type: TodoListActions.ADD,
    payload: {
      ID: shortID.generate(),
      text,
      timeStarted: new Date()
    }
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
      return addTodoHelper(state, action.payload)
    case TodoListActions.COMPLETE:
      return completeTodoHelper(state, action.payload)
    case TodoListActions.REMOVE:
      return removeTodoHelper(state, action.payload)
    default:
      return state
  }
}

// -- Reducer Helpers --

function addTodoHelper(state: TodoListState, todo: Todo): TodoListState {
  return {
    ...state,
    inProgressTodoList: [...state.inProgressTodoList, todo]
  }
}

function completeTodoHelper(state: TodoListState, todoID: string): TodoListState {
  const { completedTodos } = state;
  
  const completedTodo = {
    ...state.inProgressTodoList.find(todoByID(todoID)) as Todo,
    timeEnded: new Date()
  }
  const dateKey = format(completedTodo.timeEnded, TIME_FORMAT)

  if (completedTodos.has(dateKey)) {
    completedTodos.set(dateKey, [...completedTodos.get(dateKey), completedTodo])
  } else {
    completedTodos.set(dateKey, [completedTodo])
  }

  return {
    inProgressTodoList: state.inProgressTodoList.filter(notTodoByID(todoID)),
    completedTodos: new Map(completedTodos)
  }
}

function removeTodoHelper(state: TodoListState, todoID: string): TodoListState {
  return {
    ...state,
    inProgressTodoList: state.inProgressTodoList.filter(notTodoByID(todoID))
  }
}