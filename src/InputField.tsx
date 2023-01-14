import React, { useRef } from 'react'

interface Props {
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAdd:(e:React.FormEvent)=> void,
}

export const InputField = ( data:Props ) => {

    const {todo, setTodo, handleAdd} = data

    const inputRef = useRef<HTMLInputElement>(null)

    return (
    <form onSubmit={(e)=> {
        handleAdd(e), 
        inputRef.current?.blur}}
        >
        <input 
        ref={inputRef}
        placeholder='Write a task'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        />
        <button>Save</button>
    </form>
  )
}
