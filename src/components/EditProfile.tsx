
import { useState } from "react";
import { apiCall } from "../utils/api";
import axios from "axios";
import { UserCard } from "./UserCard";
import type { IFeed } from "../utils/types";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";

export const EditProfile = ({ user }: { user: IFeed }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState<number | "">(user.age ?? "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState<string[]>(user.skills || []);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const dispatch = useDispatch();
    const [toast, setToast] = useState<boolean>(false);

    const isFormChanged =
        firstName !== (user.firstName || "") ||
        lastName !== (user.lastName || "") ||
        age !== (user.age ?? "") ||
        gender !== (user.gender || "") ||
        about !== (user.about || "") ||
        photoUrl !== (user.photoUrl || "") ||
        skills.join(",") !== (user.skills || []).join(",");

    async function handleUpdate(): Promise<void> {
        try {
            const res = await apiCall("/profile/edit", 'PATCH', {
                firstName,
                lastName,
                age: age === "" ? undefined : Number(age),
                gender,
                about,
                skills,
                photoUrl,
            });
            dispatch(updateUser(res.data.data));
            setToast(true);
            const timeout = setTimeout(() => {
                setToast(false);
                clearTimeout(timeout);
            }, 3000);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Some error occurred');
            } else {
                setError('Some error occurred');
            }
        }
    }

    return (
        <div className="flex items-center justify-center py-4 sm:py-8 w-full">
            {!preview ? (
                <div className="card bg-base-200/80 backdrop-blur-md border border-base-content/10 shadow-2xl rounded-3xl w-full max-w-xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-base-content/10">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/40 shadow-md shrink-0 bg-base-300">
                            <img
                                src={photoUrl || user.photoUrl}
                                alt={firstName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        'https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg';
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-base-content">
                                Edit Profile
                            </h2>
                            <p className="text-xs sm:text-sm text-base-content/60">
                                Personalize your developer card to match with the right collaborators.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-medium text-xs text-base-content/80">First Name</legend>
                                <input
                                    type="text"
                                    className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                    placeholder="e.g. Aditya"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend font-medium text-xs text-base-content/80">Last Name</legend>
                                <input
                                    type="text"
                                    className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                    placeholder="e.g. Gantayat"
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
                                    placeholder="e.g. 25"
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
                                            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                                                gender.toLowerCase() === opt
                                                    ? 'bg-primary text-primary-content border-primary shadow-sm'
                                                    : 'bg-base-300/50 border-base-content/10 text-base-content/70 hover:border-primary/40'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
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
                            <legend className="fieldset-legend font-medium text-xs text-base-content/80">About / Bio</legend>
                            <input
                                type="text"
                                className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary"
                                placeholder="A brief description of your background and what you are building"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <div className="flex justify-between items-center w-full">
                                <legend className="fieldset-legend font-medium text-xs text-base-content/80">Skills & Tech Stack</legend>
                                <span className="text-[11px] text-base-content/40">Comma separated</span>
                            </div>
                            <input
                                type="text"
                                className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary font-mono text-sm"
                                placeholder="React, Node.js, TypeScript, MongoDB"
                                value={skills.join(', ')}
                                onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
                            />
                            {skills.filter(Boolean).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {skills.filter(Boolean).map((s, idx) => (
                                        <span key={idx} className="badge badge-xs badge-outline badge-primary bg-primary/5 px-2 py-1">
                                            #{s}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-medium text-xs text-base-content/80">Profile Photo URL</legend>
                            <input
                                type="text"
                                className="input w-full rounded-xl bg-base-300/50 border-base-content/20 focus:border-primary font-mono text-xs"
                                placeholder="https://example.com/photo.jpg"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </fieldset>
                    </div>

                    {error && (
                        <div className="alert alert-error text-xs rounded-2xl mt-4 py-2.5">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-8 pt-5 border-t border-base-content/10">
                        <button
                            type="button"
                            className="btn btn-outline rounded-full px-6"
                            onClick={() => setPreview(true)}
                        >
                            👁️ Preview Card
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/25 disabled:opacity-40"
                            disabled={!isFormChanged}
                            onClick={handleUpdate}
                        >
                            Save Changes
                        </button>
                    </div>

                    <div className="toast toast-bottom toast-end z-50">
                        {toast && (
                            <div className="alert alert-success text-white shadow-xl rounded-2xl flex items-center gap-2">
                                <span>✓ Profile updated successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <div className="text-center">
                        <span className="badge badge-sm badge-neutral/80 border border-base-content/10 text-xs px-3 py-1 mb-2 font-medium">
                            Card Preview
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-base-content">
                            How Others See You
                        </h2>
                    </div>

                    <UserCard
                        user={{
                            _id: user._id,
                            firstName,
                            lastName,
                            age: age === "" ? undefined : Number(age),
                            gender,
                            about,
                            skills: skills.filter(Boolean),
                            photoUrl,
                        }}
                        showButtons={false}
                    />

                    <button
                        className="btn btn-outline rounded-full px-8 gap-2 shadow-sm"
                        onClick={() => setPreview(false)}
                    >
                        ← Back to Edit
                    </button>
                </div>
            )}
        </div>
    );
};
