import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/authSlice";
export default function AuthForm(){
    const[error,setError]=useState('')
    const dispatch=useDispatch()
    function handleSubmit(event){
        event.preventDefault()
        const form=new FormData(event.currentTarget)
        const email=form.get('email').trim().toLowerCase()
        const password=form.get('password')
        if(email !== 'demo@taskboard.com' || password !== 'task123'){
            setError('Use the demo email and password shown below.')
            return
        }
        dispatch(logIn({email}))
    }
    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <label>
                Email
                <input type="email"
                name="email"
                autoComplete="username"
                required />
            </label>
            <label>
                Password
                <input type="password"
                name="password"
                autoComplete="current-password"
                required />
            </label>

            {error && <p role="alert">{error}</p>}
           <button type="submit">Log In</button>
           <p>Demo email: demo@taskboard.com</p>
           <p>Demo password: task123</p>
            </form>
    )
}