'use client'
import React, { useCallback } from 'react'
import { AiFillDelete } from "react-icons/ai"
import { useRouter } from 'next/navigation'

type TodoItemProps = {
  index: number,
  id: string,
  title: string,
  completed: boolean,
  toggelTodo: (id: string, completed: boolean) => void
  deleteTodo: (id: string) => void
}

export default function TodoItem({ index, id, title, completed, toggelTodo, deleteTodo }: TodoItemProps) {
  const router = useRouter()
  const deleteTodoLocal = async (id: string) => {
    await deleteTodo(id)
    router.refresh()
  }
  return (
    <>
      <li className='flex gap-2 items-center ml-4'>
        <p>{index}.{" "}</p>
        <div className='flex gap-2 items-center'>
          <input type="checkbox" className='cursor-pointer peer' id={id}
            onChange={(e) => toggelTodo(id, e.target.checked)}
            defaultChecked={completed}
          />
          <label htmlFor={id} className='peer-checked:line-through peer-checked:text-slate-400'>
            {title}
          </label>
          <AiFillDelete color='red' className='text-sm cursor-pointer active:cursor-wait' onClick={() => {
            deleteTodoLocal(id)
          }} />
        </div>
      </li>
    </>
  )
}
