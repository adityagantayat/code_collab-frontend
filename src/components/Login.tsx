import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { apiCall } from "../utils/api"

export const Login = () => {
    const [emailId, setEmailId] = useState("aditya@example.com")
    const [password, setPassword] = useState("Password123@")
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState<number | "">('');
    const [gender, setGender] = useState('');
    const [about, setAbout] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [photoUrl, setPhotoUrl] = useState('');
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
    async function handleRegister(): Promise<void> {
        try {
            const res = await apiCall("/auth/signup", 'POST', { firstName, lastName, age, gender, about, skills, photoUrl: photoUrl || undefined, emailId, password });
            dispatch(addUser(res.data.data));
            navigate('/profile');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message || 'Some error occured');
        }
    }

    return (
        <div className="flex items-center justify-center p-10">
            <div className="card bg-neutral text-base-content w-[450px]">
                <div className="card-body items-center justify-center">
                    <h2 className="card-title">Login</h2>
                    <div className="form-control">
                        {!isLoginForm &&
                            <>
                                <div className="flex justify-center gap-10">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">First Name</legend>
                                        <input type="text" className="input w-full" placeholder="Enter your First Name"
                                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Last Name</legend>
                                        <input type="text" className="input w-full" placeholder="Enter your Last Name"
                                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </fieldset>
                                </div>
                                <div className="flex justify-center gap-4">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Age</legend>
                                        <input
                                            type="number"
                                            className="input w-full"
                                            placeholder="Enter your Age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Gender</legend>
                                        <div className="flex gap-4 items-center justify-center my-2">
                                            <label className="label cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={gender.toLowerCase() === "male"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="radio radio-primary"
                                                />
                                                <span className="label-text">Male</span>
                                            </label>
                                            <label className="label cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={gender.toLowerCase() === "female"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="radio radio-primary"
                                                />
                                                <span className="label-text">Female</span>
                                            </label>
                                            <label className="label cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="other"
                                                    checked={gender.toLowerCase() === "other"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="radio radio-primary"
                                                />
                                                <span className="label-text">Other</span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <input type="text" className="input w-full" placeholder="Enter your About"
                                        value={about} onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Skills</legend>
                                    <input type="text" className="input w-full" placeholder="Enter your Skills"
                                        value={skills} onChange={(e) => setSkills(e.target.value.split(','))} />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Photo URL</legend>
                                    <input type="text" className="input w-full" placeholder="Enter your Photo URL"
                                        value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                </fieldset>
                            </>
                        }
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
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleRegister}>{isLoginForm ? "Login" : "Register"}</button>
                    </div>
                    <p className="text-center cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "Don't have an account? Register here" : "Already have an account? Login here"}</p>
                </div>
            </div>
        </div>
    )
}