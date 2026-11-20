import { createSlice } from "@reduxjs/toolkit";
const sampleTasks=[
  {
  id:'1',
  title:'Send stems to the mix engineer',
  description:'Export labeled WAV tracks and share the folder.',
  status:'pending',
},
{
  id:'2',
  title:'Approve cover art',
  description:'Check the final artwork and confirm the release title.',
  status:'completed'
},
]
const tasksSlice=createSlice({
    name:'tasks',
    initialState:sampleTasks,
    reducers:{addTask(state, action){
        state.push(action.payload)
    },
updateTask(state, action){
    const{id, changes}=action.payload
    const task=state.find((task)=>task.id === id)
    if(task){
        Object.assign(task,changes)
    }
},
deleteTask(state, action){
    return state.filter((task)=>task.id !== action.payload)
},},
})
export const {addTask, updateTask, deleteTask}=tasksSlice.actions
export default tasksSlice.reducer