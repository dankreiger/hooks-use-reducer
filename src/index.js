import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodosContext from './context';
import todosReducer from './reducer';
import axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // custom hook
  const savedTodos = useAPI(`${process.env.REACT_APP_NOW_URL}`);

  useEffect(
    () => {
      dispatch({
        type: 'GET_TODOS',
        payload: savedTodos
      });
    },
    [savedTodos]
  );
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
