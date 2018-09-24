import { Todo } from "./todolist";

export function todoByID(ID: string) {
  return (todo: Todo) => todo.ID === ID
}

export function notTodoByID(ID: string) {
  return (todo: Todo) => todo.ID !== ID
}