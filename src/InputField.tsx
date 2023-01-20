import React, { useRef } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputField = (data: Props) => {
  const { todo, setTodo, handleAdd } = data;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e), inputRef.current?.blur;
      }}
    >
      <Box sx={{ marginY: 2 }}>
        <TextField
          sx={{ width: 470 }}
          id="standard-basic"
          variant="standard"
          ref={inputRef}
          placeholder="Write a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button sx={{ marginLeft: 2 }} variant="contained" type="submit">
          Add
        </Button>
      </Box>
    </form>
  );
};
