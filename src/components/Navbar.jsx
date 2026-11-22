import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
export default function Navbar(){
    const dispatch=useDispatch()
    return(
        <header className="board-header">
            <h1>Task Board</h1>
            <button type="button" onClick={()=>dispatch(logOut())}>Log Out</button>
        </header>
    )
}