import React, { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { Todo } from "./model";
import { TodoList } from "./TodoList";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

export const App: React.FC = () => {
  const [todod, setTodod] = useState<string>("");
  const [favorites, setFavorites] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedState = localStorage.getItem("Todos");
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        { id: Date.now(), todo: todo, isDone: false, desc: todod, fav: false },
      ]);
      setTodo("");
      setTodod("");
    }
  }

  return (
    <Container maxWidth="sm" sx={{p:0}}>
      <Typography
        variant="h1"
        sx={{
          fontSize: 30,
          color: "#1976d2",
          fontWeight: "bold",
          textAlign:'center',
          p:1
        }}
      >
        Tasks
      </Typography>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} todod={todod} setTodod={setTodod}/>
      <TodoList todos={todos} setTodos={setTodos} todod={todod} setTodod={setTodod}/>
    </Container>
  );
};
