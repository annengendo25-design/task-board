import test from 'node:test'
import assert from 'node:assert/strict'
import tasksReducer,{
    addTask,
    updateTask,
    deleteTask,
} from '../src/features/tasks/tasksSlice.js'
import authReducer, {logIn,logOut} from '../src/features/auth/authSlice.js'

const task={
    id:'test-1',
    title:'Send stems',
    description:'',
    status:'pending',
}
test('adds a task to an empty list',()=>{
    assert.deepEqual(tasksReducer([],addTask(task)),[task])
})
test('edits a task title and marks it completed',()=>{
    const updated=tasksReducer([task],updateTask({
        id:task.id,
        changes:{title:'Send final stems',status:'completed'},
    }))
    assert.deepEqual(updated,[
        {...task,title:'Send final stems',status:'completed'},
    ])
})
test('deletes only the selected task',()=>{
    const otherTask={...task,id:'test-2',title:'Approve cover art'}
    assert.deepEqual(tasksReducer([task,otherTask],deleteTask(task.id)),[otherTask],)
})
test('sets the user on login and cleard it on logout',()=>{
    const user={email:'demo@releaseboard.com'}
    const signedIn=authReducer({user:null},logIn(user))
    assert.deepEqual(signedIn.user,user)
    assert.equal(authReducer(signedIn,logOut()).user,null)
})