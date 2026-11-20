import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import tasksReducer from './features/tasks/tasksSlice.js'
const storageKey='release-board-tasks'
function loadTasks(){
    try{
        const savedTasks=JSON.parse(localStorage.getItem(storageKey))
        return Array.isArray(savedTasks) ? savedTasks: undefined
    } catch{
        return undefined
    }
}
const savedTasks=loadTasks()
export const store=configureStore({
    reducer:{
        tasks:tasksReducer,
        auth:authReducer,
    },
    preloadedState:savedTasks === undefined ? undefined : {tasks: savedTasks},
})
let previousTasks=store.getState().tasks
store.subscribe(()=>{
    const currentTasks=store.getState().tasks
    if(currentTasks === previousTasks) return
    previousTasks=currentTasks
    try{
        localStorage.setItem(storageKey,JSON.stringify(currentTasks))
    } catch (error){
        console.warn('Could not save Release Board tasks.', error)
    }
})