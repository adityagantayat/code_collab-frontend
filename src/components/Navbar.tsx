import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../utils/appStore"
import { Link } from "react-router-dom";
import { apiCall } from "../utils/api";
import { removeUser } from "../utils/userSlice";

export const Navbar = () => {
    const user = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch();
    async function handleLogout(): Promise<void> {
        try {
            await apiCall('/auth/signout', 'POST')
            dispatch(removeUser());
            window.location.href = '/login';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">🧑🏻‍💻 Code Collab</Link>
            </div>
            {user && <div className="dropdown dropdown-end mx-5">
                <div className="flex items-center space-x-3">
                    <p>Welcome, {user.firstName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                </div>

                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to='/profile' className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><Link to='/connections'>View Connections</Link></li>
                    <li><Link to='/requests'>View Requests</Link></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>}
        </div>
    )
}