import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inProgress, setInprogress] = useState<Todo[]>([]);
  const [completedTodos, setCompletedods] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = todos;
    let progress = inProgress;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosProgress") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosProgress") {
      progress.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedods(complete);
    setTodos(active);
    setInprogress(progress);
  };

  //const [todo, setTodo] = useState<string | number>('')
  //const [todo, setTodo] = useState<string[]>('')  ..array of strings
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          inProgress={inProgress}
          setInprogress={setInprogress}
          completedTodos={completedTodos}
          setCompletedods={setCompletedods}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
