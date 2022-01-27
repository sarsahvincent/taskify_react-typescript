import React from "react";
import "../style/styles.css";
import { Todo } from "../model";
import SingleTodo from "../components/SingleTodo";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          setTodos={setTodos}
          todos={todos}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
