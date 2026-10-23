import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { apiCall } from "../utils/api"

export const Login = () => {
    const [emailId, setEmailId] = useState("aditya@example.com")
    const [password, setPassword] = useState("Password123@")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleLogin(): Promise<void> {
        try {
            const res = await apiCall("/auth/signin", 'POST', { emailId, password });
            dispatch(addUser(res.data.data));
            navigate('/');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message || 'Some error occured');
        }
    }

    return (
        <div className="flex items-center justify-center p-24">
            <div className="card bg-neutral text-base-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Login</h2>
                    <div className="form-control">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="email" className="input" placeholder="Enter your Email ID"
                                value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Enter your Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <button className="btn btn-ghost">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}