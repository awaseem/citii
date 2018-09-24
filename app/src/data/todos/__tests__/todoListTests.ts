import { Todo, addTodo, todoListReducer, TodoListState, removeTodo, completeTodo } from "../todolist";

const testTodo: Todo = {
  ID: 'test',
  text: 'text',
  timeStarted: new Date(),
  timeEnded: new Date()
}

const todoListTests = [
  // -- Adding todo tests
  {
    description: 'add todo to list',
    state: undefined as TodoListState,
    action: addTodo(testTodo),
    expect: {
      inProgressTodoList: [testTodo] as Todo[],
      completedTodoList: [] as Todo[]
    }
  },
  {
    description: 'add second todo from list',
    state: {
      inProgressTodoList: [testTodo] as Todo[],
      completedTodoList: [] as Todo[]
    },
    action: addTodo(testTodo),
    expect: {
      inProgressTodoList: [testTodo, testTodo] as Todo[],
      completedTodoList: [] as Todo[]
    }
  },
  {
    description: 'remove todo from list',
    state: {
      inProgressTodoList: [testTodo] as Todo[],
      completedTodoList: [] as Todo[]
    },
    action: removeTodo(testTodo.ID),
    expect: {
      inProgressTodoList: [] as Todo[],
      completedTodoList: [] as Todo[]
    }
  },
  {
    description: 'remove the second todo from list',
    state: {
      inProgressTodoList: [testTodo, {
        ...testTodo,
        ID: 'test2'
      }] as Todo[],
      completedTodoList: [] as Todo[]
    },
    action: removeTodo(testTodo.ID),
    expect: {
      inProgressTodoList: [{
        ...testTodo,
        ID: 'test2',
      }] as Todo[],
      completedTodoList: [] as Todo[]
    }
  },
  {
    description: 'complete a todo from list',
    state: {
      inProgressTodoList: [testTodo] as Todo[],
      completedTodoList: [] as Todo[]
    },
    action: completeTodo(testTodo.ID),
    expect: {
      inProgressTodoList: [] as Todo[],
      completedTodoList: [testTodo] as Todo[]
    }
  }
]

describe('todoList reducer', () => {
  todoListTests.forEach((test) => {
    it(test.description, () => {
      const actual = todoListReducer(test.state, test.action)
      expect(actual).toEqual(test.expect)
    })
  })
})