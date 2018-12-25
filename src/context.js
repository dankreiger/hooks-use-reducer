import React from 'react';

const TodosContext = React.createContext({
  todos: [
    // { id: 1, text: 'Walk the dog', complete: false },
    // { id: 2, text: 'Change my personality', complete: false },
    // { id: 3, text: 'Learn machine learning', complete: true }
  ],
  currentTodo: {}
});

export default TodosContext;
