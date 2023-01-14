import React, { useState } from "react";
import { InputField } from "./InputField";
import { Todo } from "./model";
import { TodoList } from "./TodoList";

export const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  function handleAdd(e:React.FormEvent) {
    e.preventDefault()
    if (todo) {
      setTodos([...todos,{id:Date.now(), todo:todo, isDone: false}])
      setTodo('')
    }
  }

  return (
    <>
      <h1>Taskify</h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
};
