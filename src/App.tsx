import React, { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { Todo } from "./model";
import { TodoList } from "./TodoList";
import { Container} from "@mui/system";
import { Typography } from "@mui/material";

export const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(()=>{
    const savedState = localStorage.getItem("Todos");
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return []
    }
    });

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  }

  return (
    <Container  maxWidth="sm">
      <Typography variant="h1"   sx={{
     fontSize: 30,
     color: '#1976d2',
     fontWeight:"bold",
  }}>Taskify</Typography>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};
