import axios from "axios"
import { useState } from "react"

export const Login = () => {
    const [emailId, setEmailId] = useState("aditya@example.com")
    const [password, setPassword] = useState("Password123@")

    async function handleLogin(): Promise<void> {
        try {
            const res = await axios.post("http://localhost:3000/auth/signin", { emailId, password }, { withCredentials: true })
            console.log("res", res.data)
        } catch (error) {
            console.log("error", error)
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
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <button className="btn btn-ghost">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}