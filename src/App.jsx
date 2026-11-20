import './App.css'
import { useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { deleteTask,updateTask } from './features/tasks/tasksSlice';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App(){
  const tasks=useSelector((state)=>state.tasks)
  const dispatch=useDispatch()
  const handleUpdate=useCallback((id,changes)=>{
    dispatch(updateTask({id,changes}))
  },[dispatch])
  const handleDelete=useCallback((id)=>{
    dispatch(deleteTask(id))
  },[dispatch])
  return(
    <main>
      <h1>Release Board</h1>
      <TaskForm/>
      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete}/>
    </main>
  )
}