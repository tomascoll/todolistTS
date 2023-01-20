import { useState, useEffect, useRef } from "react";
import { Todo } from "./model";
import { TodoList } from "./TodoList";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import {
  Fab,
  Box,
  TextField,
  ListItemText,
  List,
  Divider,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
} from "@mui/material";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const SingleInput = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <>
      <form
        onSubmit={(e) => {
          handleEdit(e, todo.id);
        }}
      >
        <List sx={{ bgcolor: "background.paper" }}>
          {edit ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Checkbox
                  defaultChecked
                  sx={{ marginRight: 1 }}
                  onClick={() => handleDone(todo.id)}
                />
                <ListItemText
                  sx={{
                    textDecorationLine: "line-through",
                    display: "flex",
                    alignItems: "center",
                    color:"#D0D0D0"
                  }}
                >
                  {todo.todo}
                </ListItemText>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ "& > :not(style)": { marginY: 1, display: "flex" } }}
                >
                  <Fab
                    disabled
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      if (!edit && !todo.isDone) {
                        setEdit(!edit);
                      }
                    }}
                  >
                    <AiFillEdit />
                  </Fab>
                  <Fab
                    size="small"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <AiFillDelete />
                  </Fab>
                </Box>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Checkbox
                  sx={{ marginRight: 1 }}
                  onClick={() => handleDone(todo.id)}
                />
                <ListItemText sx={{ display: "flex", alignItems: "center" }}>
                  {todo.todo}
                </ListItemText>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ "& > :not(style)": { marginY: 1, display: "flex" } }}
                >
                  <Fab
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      if (!edit && !todo.isDone) {
                        setEdit(!edit);
                      }
                    }}
                  >
                    <AiFillEdit />
                  </Fab>
                  <Fab
                    size="small"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <AiFillDelete />
                  </Fab>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </List>
        <Divider />
      </form>
    </>
  );
};
