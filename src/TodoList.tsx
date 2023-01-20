import React from "react";
import { Todo } from "./model";
import { SingleInput } from "./SingleInput";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div>
        <hr />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<AiOutlinePlus />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: 25,
                color: "#333333",
              }}
            >
              Incompleted
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {todos
              .filter((todos) => todos.isDone === false)
              .map((todo) => (
                <SingleInput
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AiOutlinePlus />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: 25,
                color: "#333333",
              }}
            >
              Completed ({todos.filter((todos) => todos.isDone === true).length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {todos
              .filter((todos) => todos.isDone === true)
              .map((todo) => (
                <SingleInput
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
