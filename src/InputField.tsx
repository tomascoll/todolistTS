import React, { useRef } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todod: string;
  setTodod: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputField = (data: Props) => {
  const { todo, setTodo, handleAdd, todod, setTodod } = data;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e), inputRef.current?.blur;
      }}
    >
      <Box sx={{ margin: 2}}>
        <TextField
          sx={{ marginY: 1 , marginRight:2}}
          id="standard-basic"
          variant="standard"
          ref={inputRef}
          placeholder="New task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <TextField
          sx={{ marginY: 1 , marginRight:2}}
          id="standard-basic"
          variant="standard"
          ref={inputRef}
          placeholder="Add details"
          value={todod}
          onChange={(e) => setTodod(e.target.value)}
        />
      <Button sx={{ marginBottom: 1 }} variant="contained" type="submit">
        Add
      </Button>
      </Box>
    </form>
  );
};
