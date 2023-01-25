import { useState, useEffect, useRef } from "react";
import { Todo } from "./model";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
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
  IconButton,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const SingleInput = ({ todo, todos, setTodos }: Props) => {
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

  const handleFav = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, fav: !todo.fav } : todo))
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
        <Divider />
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
              <Button
                variant="contained"
                sx={{ marginLeft: 1, marginY: 2 }}
                type="submit"
              >
                Send
              </Button>
            </>
          ) : todo.isDone ? (
            <Container sx={{ display: "flex" }}>
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "auto",
                  }}
                >
                  <Checkbox onClick={() => handleDone(todo.id)} checked />
                  <List
                    sx={{
                      maxWidth: 390,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemText
                        primary={todo.todo}
                        secondary={todo.desc}
                        sx={{
                          textDecoration: "line-through",
                          overflow: "hidden",
                          height: "auto",
                          wordWrap: "break-word",
                          margin: "auto",
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
              <IconButton
                sx={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  marginRight: 0,
                }}
                onClick={() => handleFav(todo.id)}
              >
                {todo.fav === true ? (
                  <AiFillStar size={25} />
                ) : (
                  <AiOutlineStar size={25} />
                )}
              </IconButton>
            </Container>
          ) : (
            <Container sx={{ display: "flex", p:0 }} >
              <Accordion sx={{ boxShadow: "none" }} >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{paddingX:0,}}
                >
                  <Checkbox onClick={() => handleDone(todo.id)} />
                  <List
                  >
                    <ListItem>
                      <ListItemText
                        primary={todo.todo}
                        secondary={todo.desc}
                        sx={{
                          overflow: "hidden",
                          height: "auto",
                          wordWrap: "break-word",
                          margin:'auto', 
                        }}
                      />{" "}
                    </ListItem>
                  </List>
                </AccordionSummary>
                <AccordionDetails sx={{ }}>
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
              <IconButton
                sx={{
                  margin: "auto",
                  marginRight: 0,
                }}
                onClick={() => handleFav(todo.id)}
              >
                {todo.fav === true ? (
                  <AiFillStar size={25} />
                ) : (
                  <AiOutlineStar size={25} />
                )}
              </IconButton>
            </Container>
          )}
        </List>
      </form>
    </>
  );
};
