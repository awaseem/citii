import { Todo } from "./todolist";

export function todoByID(ID: string) {
  return (todo: Todo) => todo.ID === ID
}