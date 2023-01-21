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
  ListItem,
  Container,
} from "@mui/material";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todod: string;
  setTodod: React.Dispatch<React.SetStateAction<string>>;
};

export const SingleInput = ({
  todo,
  todos,
  setTodos,
  todod,
  setTodod,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(
    todo.todo /*Placeholder del input */
  );
  const [editTodoDesc, setEditTodoDesc] = useState<string>(
    todo.desc /*Placeholder del input */
  );

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
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo, desc: editTodoDesc } : todo
      )
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
            <>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={editTodoDesc}
                onChange={(e) => setEditTodoDesc(e.target.value)}
              />
              <button type="submit">Send</button>
            </>
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
                <List sx={{ textOverflow: "ellipsis" }}>
                  <ListItem>
                    <ListItemText
                      primary={todo.todo}
                      secondary={todo.desc}
                      sx={{
                        textDecoration: "line-through",
                        overflow: "auto",
                        maxWidth: {
                          xs: 150,
                          sm: 400
                        }
                      }}
                    />
                  </ListItem>
                </List>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ "& > :not(style)": { marginY: 1, display: "flex" } }}
                >
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#D0D0D0",
                        marginRight: 1,
                      }}
                    >
                      Edit
                    </Typography>
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
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 1,
                      }}
                    >
                      Delete
                    </Typography>
                    <Fab
                      size="small"
                      color="error"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <AiFillDelete />
                    </Fab>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Checkbox onClick={() => handleDone(todo.id)} />

                <List>
                  <ListItem sx={{maxWidth: 350}}>
                    <ListItemText
                      primary={todo.todo}
                      secondary={todo.desc}
                      sx={{
                        overflow: "auto",
                        maxWidth: {
                          xs: 150,
                          sm: 400
                        }
                      }}
                    />{" "}
                  </ListItem>
                </List>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ "& > :not(style)": { marginY: 1, display: "flex" } }}
                >
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 1,
                      }}
                    >
                      Edit
                    </Typography>
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
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 1,
                      }}
                    >
                      Delete
                    </Typography>
                    <Fab
                      size="small"
                      color="error"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <AiFillDelete />
                    </Fab>
                  </Box>
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
