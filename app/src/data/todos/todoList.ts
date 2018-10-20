import { todoByID, notTodoByID } from "./todoHelpers";
import shortID from 'shortid'
import { format } from "date-fns";
import { TIME_FORMAT } from "../../common/date";
import { pointsCalculator } from "../points/pointsCalculator";

export enum TodoListActions {
  ADD,
  REMOVE,
  COMPLETE,
  SET
}

export interface Todo {
  ID: string;
  text: string;
  timeStarted: Date
  timeEnded?: Date
  points?: number
}

export interface TodoListState {
  inProgressTodoList: Todo[]
  completedTodos: CompletedTodos;
}

export type CompletedTodos = { [key: string]: Todo[] };

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
  payload: {
    todoID: string,
    timeEnded: Date,
    points: number
  }
}

export interface SetTodoAction {
  type: TodoListActions.SET,
  payload: TodoListState
}

export type TodoAction = AddTodoAction | RemoveTodoAction | CompleteTodoAction | SetTodoAction

// -- Constants --

export const initialTodoListState: TodoListState = {
  inProgressTodoList: [],
  completedTodos: {}
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

export function completeTodo(todoID: string, timeEnded: Date, points: number): CompleteTodoAction {
  return {
    type: TodoListActions.COMPLETE,
    payload: {
      todoID,
      timeEnded,
      points
    }
  }
}

export function setTodo(state: TodoListState): SetTodoAction {
  return {
    type: TodoListActions.SET,
    payload: state
  }
}

// -- Reducer -- 

export function todoListReducer(state: TodoListState = initialTodoListState, action: TodoAction): TodoListState {
  switch (action.type) {
    case TodoListActions.ADD:
      return addTodoHelper(state, action.payload)
    case TodoListActions.COMPLETE:
      return completeTodoHelper(state, action.payload.todoID, action.payload.timeEnded, action.payload.points)
    case TodoListActions.REMOVE:
      return removeTodoHelper(state, action.payload)
    case TodoListActions.SET:
      return action.payload
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

function completeTodoHelper(state: TodoListState, todoID: string, timeEnded: Date, points: number): TodoListState {
  const { completedTodos } = state;
  
  const todo = state.inProgressTodoList.find(todoByID(todoID)) as Todo

  const completedTodo = {
    ...todo,
    timeEnded,
    points
  }
  const dateKey = format(completedTodo.timeEnded, TIME_FORMAT)

  const newCompletedTodos = completedTodos[dateKey] ? [...completedTodos[dateKey], completedTodo] : [completedTodo]

  return {
    inProgressTodoList: state.inProgressTodoList.filter(notTodoByID(todoID)),
    completedTodos: {
      ...completedTodos,
      [dateKey]: newCompletedTodos
    }
  }
}

function removeTodoHelper(state: TodoListState, todoID: string): TodoListState {
  return {
    ...state,
    inProgressTodoList: state.inProgressTodoList.filter(notTodoByID(todoID))
  }
}