import Image from 'next/image'
import Link from 'next/link'
import { prisma } from './db'
import TodoItem from './components/TodoItem';
import { redirect } from 'next/navigation';
import { AiTwotoneMail, AiFillPhone, AiFillLinkedin } from "react-icons/ai"

const getTodos = async () => {
  return prisma.todo.findMany();
}

const getContacts = async () => {
  return prisma.contact.findMany();
}
const toggelTodo = async (id: string, completed: boolean) => {
  "use server"
  console.log(completed)
  await prisma.todo.update({ where: { id }, data: { completed } })

}
const deleteTodo = async (id: string) => {
  "use server"
  return prisma.todo.delete({ where: { id } })
}
const icons = [
  <AiTwotoneMail className="text-slate-100 text-xl" />,
  <AiFillPhone className="text-slate-100 text-xl" />,
  <AiFillLinkedin className="text-slate-100 text-xl" />
]
export default async function Home() {
  const todos = await getTodos()
  const contacts = await getContacts()
  console.log({ todos })

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>Todos</h1>
        <Link className='border border-slate-300 text-slate-100 px-2 py-1 rounded
    hover:bg-slate-600 focus-within:bg-slate-700 outline-none
    ' href="/new">New</Link>
      </header>
      <ul>
        {todos?.map((todo, index) => (
          <TodoItem key={todo.id} index={index} {...todo} toggelTodo={toggelTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
      <footer className='self-end'>
        <h2 className='text-center'>Contact Me</h2>
        <ol className='flex gap-5 justify-center items-center'>
          {contacts?.map((contact, i) => (
            <li key={contact.id} className='flex items-center gap-2 p-2 border border-slate-300 text-slate-100 px-2 py-1 rounded hover:bg-slate-600 focus-within:bg-slate-700 outline-none'>
              {icons[i]}
              <a href={contact.link} target='_blank'>{contact.title}</a>
            </li>
          ))}
        </ol>
      </footer>
    </>
  )
}
