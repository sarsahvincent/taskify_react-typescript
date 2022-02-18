import React from "react";
import "../style/styles.css";
import { Todo } from "../model";
import SingleTodo from "../components/SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedods: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  completedTodos,
  setCompletedods,
  todos,
  setTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className="todos dragactive"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                setTodos={setTodos}
                todos={todos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                setTodos={setCompletedods}
                todos={completedTodos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
