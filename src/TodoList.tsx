import React from "react";
import { Todo } from "./model";
import { SingleInput } from "./SingleInput";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({ todos, setTodos}) => {
  return (
    <>
      <div>
        <hr/>
        {todos.map((todo) => (
          <SingleInput
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </>
  );
};
