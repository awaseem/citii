import { Todo } from "../todolist";
import { todoByID } from "../todoHelpers";

const testTodo: Todo = {
  ID: 'test',
  text: 'text',
  timeStarted: new Date(),
  timeEnded: new Date()
}

describe('todoByID tests', () => {
  it('should work by returning true by the right ID', () => {
    expect(todoByID('test')(testTodo)).toBeTruthy()
  })
})