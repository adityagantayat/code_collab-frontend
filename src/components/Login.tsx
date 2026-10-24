import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../utils/api";
import axios from "axios";

export const Login = () => {
    const [emailId, setEmailId] = useState("aditya@example.com");
    const [password, setPassword] = useState("Password123@");
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
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Some error occurred');
            } else {
                setError('Some error occurred');
            }
        }
    }

    async function handleRegister(): Promise<void> {
        try {
            const res = await apiCall("/auth/signup", 'POST', {
                firstName,
                lastName,
                age,
                gender,
                about,
                skills,
                photoUrl: photoUrl || undefined,
                emailId,
                password,
            });
            dispatch(addUser(res.data.data));
            navigate('/profile');
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Some error occurred');
            } else {
                setError('Some error occurred');
            }
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center py-6 sm:py-10 px-4 w-full">
            <div className="card bg-base-200/80 backdrop-blur-md border border-base-content/10 shadow-2xl rounded-3xl w-full max-w-lg p-6 sm:p-8">
                {/* Brand Header */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content text-2xl shadow-lg shadow-primary/20 mx-auto mb-3">
                        💻
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                        {isLoginForm ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                        {isLoginForm
                            ? "Sign in to access your developer feed & matches."
                            : "Join CodeCollab to meet developers & build projects."}
                    </p>
                </div>

                {/* Segmented Switcher */}
                <div className="grid grid-cols-2 p-1.5 bg-base-300/80 rounded-2xl mb-6 border border-base-content/10">
                    <button
                        type="button"
                        className={`py-2 text-sm font-semibold rounded-xl transition-all ${
                            isLoginForm
                                ? 'bg-primary text-primary-content shadow-md'
                                : 'text-base-content/60 hover:text-base-content'
                        }`}
                        onClick={() => {
                            setIsLoginForm(true);
                            setError('');
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        className={`py-2 text-sm font-semibold rounded-xl transition-all ${
                            !isLoginForm
                                ? 'bg-primary text-primary-content shadow-md'
                                : 'text-base-content/60 hover:text-base-content'
                        }`}
                        onClick={() => {
                            setIsLoginForm(false);
                            setError('');
                        }}
                    >
                        Register
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isLoginForm) {
                            handleLogin();
                        } else {
                            handleRegister();
                        }
                    }}
                    className="flex flex-col gap-4"
                >
                    {!isLoginForm && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend font-medium text-xs text-base-content/80">First Name</legend>
                                    <input
                                        type="text"
                                        className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend font-medium text-xs text-base-content/80">Last Name</legend>
                                    <input
                                        type="text"
                                        className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend font-medium text-xs text-base-content/80">Age</legend>
                                    <input
                                        type="number"
                                        className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                        placeholder="e.g. 24"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                                    />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend font-medium text-xs text-base-content/80">Gender</legend>
                                    <div className="grid grid-cols-3 gap-1.5 mt-0.5">
                                        {(['male', 'female', 'other'] as const).map((opt) => (
                                            <label
                                                key={opt}
                                                className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                                                    gender.toLowerCase() === opt
                                                        ? 'bg-primary text-primary-content border-primary shadow-sm'
                                                        : 'bg-base-300/50 border-base-content/10 text-base-content/70 hover:border-primary/40'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="registerGender"
                                                    value={opt}
                                                    checked={gender.toLowerCase() === opt}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="hidden"
                                                />
                                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-medium text-xs text-base-content/80">About</legend>
                                <input
                                    type="text"
                                    className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                    placeholder="Brief bio or what you are looking to build"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <div className="flex justify-between items-center w-full">
                                    <legend className="fieldset-legend font-medium text-xs text-base-content/80">Skills</legend>
                                    <span className="text-[11px] text-base-content/40">Comma-separated</span>
                                </div>
                                <input
                                    type="text"
                                    className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary font-mono text-sm"
                                    placeholder="React, TypeScript, Node.js"
                                    value={skills.join(', ')}
                                    onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-medium text-xs text-base-content/80">Photo URL (optional)</legend>
                                <input
                                    type="text"
                                    className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary font-mono text-xs"
                                    placeholder="Leave blank for default avatar"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>
                        </>
                    )}

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-medium text-xs text-base-content/80">Email ID</legend>
                        <input
                            type="email"
                            className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                            placeholder="you@example.com"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-medium text-xs text-base-content/80">Password</legend>
                        <input
                            type="password"
                            className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </fieldset>

                    {error && (
                        <div className="alert alert-error text-xs rounded-2xl py-2.5 mt-2">
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full rounded-2xl py-3 mt-4 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.99] transition-all"
                    >
                        {isLoginForm ? "Sign In to CodeCollab" : "Create Account"}
                    </button>

                    <p
                        className="text-center text-xs text-base-content/60 hover:text-primary cursor-pointer mt-3 transition-colors"
                        onClick={() => {
                            setIsLoginForm(!isLoginForm);
                            setError('');
                        }}
                    >
                        {isLoginForm
                            ? "Don't have an account yet? Register here"
                            : "Already have an account? Sign in here"}
                    </p>
                </form>
            </div>
        </div>
    );
};