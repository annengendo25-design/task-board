import { useCallback,useMemo,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { deleteTask,updateTask } from '../features/tasks/tasksSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar.jsx'

export default function Dashboard(){
  const tasks=useSelector((state)=>state.tasks)
  const dispatch=useDispatch()
  const [statusFilter,setStatusFilter]=useState('all')
  const visibleTasks=useMemo(()=>{
    if(statusFilter === 'all')return tasks
    return tasks.filter((task)=>task.status === statusFilter)
  },[tasks,statusFilter])
  const handleUpdate=useCallback((id,changes)=>{
    dispatch(updateTask({id,changes}))
  },[dispatch])
  const handleDelete=useCallback((id)=>{
    dispatch(deleteTask(id))
  },[dispatch])
  return(
    <main>
     <Navbar></Navbar>
      <TaskForm/>
      <label>
        Filter by status
        <select value={statusFilter}
        onChange={(event)=>setStatusFilter(event.target.value)}>
          <option value="all">All tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      {visibleTasks.length === 0?(
        <p>No tasks match this filter.</p>):(
          <TaskList 
          tasks={visibleTasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}/>
        )}
    </main>
  )
}