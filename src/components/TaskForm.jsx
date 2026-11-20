import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";
export default function TaskForm(){
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const dispatch=useDispatch()
    function handleSubmit(event){
        event.preventDefault()
        const cleanTitle=title.trim()
        if(!cleanTitle) return
        dispatch(addTask({
            id:crypto.randomUUID(),
            title:cleanTitle,
            description:description.trim(),
            status:'pending',
        }))
        setTitle('')
        setDescription('')
    }
    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <label>
                Task title
                <input required
                value={title}
                onChange={(event)=>setTitle(event.target.value)}/>
            </label>
            <label>
                Description(optional)
                <textarea value={description}
                onChange={(event) => setDescription(event.target.value)}/>
            </label>
            <button type="submit">Add Task</button>
        </form>
    )
}