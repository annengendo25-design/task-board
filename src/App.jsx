import './App.css'
import { useSelector } from 'react-redux';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App(){
  const tasks=useSelector((state)=>state.tasks)
  return(
    <main>
      <h1>Release Board</h1>
      <TaskForm/>
      <TaskList tasks={tasks}/>
    </main>
  )
}