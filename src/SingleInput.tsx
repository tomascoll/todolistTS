import { useState, useEffect, useRef } from "react";
import { Todo } from "./model";
import { TodoList } from "./TodoList";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";

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

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  
  return (
    <>
      <form
        onSubmit={(e) => {
          handleEdit(e,todo.id);
        }}
      >
        {edit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : todo.isDone ? (
          <ul>✔{todo.todo}</ul>
        ) : (
          <li>{todo.todo}</li>
        )}
        <div>
          <span
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
          <span onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span onClick={() => handleDone(todo.id)}>
            <AiOutlineCheck />
          </span>
        </div>
      </form>
    </>
  );
};
