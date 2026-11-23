import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { signOutUser } from "../services/authService";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  async function handleLogout() {
    await signOutUser(user);
    dispatch(logOut());
  }

  return (
    <header className="board-header">
      <div>
        <h1>Task Board</h1>
        {user?.email && <p>Signed in as {user.email}</p>}
      </div>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}