import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
export default function Navbar(){
    const dispatch=useDispatch()
    return(
        <header>
            <h1>Release Board</h1>
            <button type="button" onClick={()=>dispatch(logOut())}>Log Out</button>
        </header>
    )
}