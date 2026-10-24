import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { Link } from "react-router-dom";
import { apiCall } from "../utils/api";
import { removeUser } from "../utils/userSlice";

export const Navbar = () => {
    const user = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch();

    async function handleLogout(): Promise<void> {
        try {
            await apiCall('/auth/signout', 'POST');
            dispatch(removeUser());
            window.location.href = '/login';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="navbar sticky top-0 z-50 backdrop-blur-md bg-base-300/80 border-b border-base-content/10 px-4 sm:px-8 transition-all">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content text-lg shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
                        💻
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold tracking-tight text-xl text-base-content">
                            Code<span className="text-primary">Collab</span>
                        </span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="flex items-center gap-2.5 py-1.5 pl-3.5 pr-2 rounded-full bg-base-200/80 hover:bg-base-200 border border-base-content/10 hover:border-primary/40 transition-all cursor-pointer shadow-sm"
                        >
                            <span className="text-sm font-medium text-base-content/90 hidden sm:inline">
                                Hi, <strong className="text-primary font-semibold">{user.firstName}</strong>
                            </span>
                            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/40 shrink-0">
                                <img
                                    alt={`${user.firstName} avatar`}
                                    src={user.photoUrl}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-200/95 backdrop-blur-xl border border-base-content/10 rounded-2xl z-50 mt-3 w-56 p-2 shadow-2xl space-y-1"
                        >
                            <li className="menu-title px-3 py-1 text-xs uppercase tracking-wider text-base-content/50">
                                My Account
                            </li>
                            <li>
                                <Link to="/profile" className="flex items-center justify-between py-2 rounded-xl active:bg-primary">
                                    <span className="flex items-center gap-2">👤 Profile</span>
                                    <span className="badge badge-xs badge-primary">Edit</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections" className="flex items-center gap-2 py-2 rounded-xl active:bg-primary">
                                    🤝 Connections
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests" className="flex items-center gap-2 py-2 rounded-xl active:bg-primary">
                                    📬 Requests
                                </Link>
                            </li>
                            <div className="divider my-1 opacity-20"></div>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 py-2 text-error hover:bg-error/10 hover:text-error rounded-xl w-full text-left"
                                >
                                    🚪 Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm rounded-full px-5 shadow-sm hover:shadow-primary/30">
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};