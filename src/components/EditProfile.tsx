
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
        <div className="flex items-center justify-center m-10">
            {!preview ? (
                <div className="card bg-neutral text-base-content w-96" >
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Edit Profile</h2>
                        <div className="form-control w-full">
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
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-secondary" onClick={() => setPreview(true)}>Preview</button>
                            <button className="btn btn-primary" disabled={!isFormChanged} onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                    <div className="toast toast-top toast-end">
                        {error && (
                            <div className="alert alert-error">
                                <span>
                                    {error}
                                </span>
                            </div>
                        )}
                        {toast && (
                            <div className="alert alert-success">
                                <span>Profile updated successfully.</span>
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <UserCard user={{ _id: user._id, firstName, lastName, age: age === "" ? undefined : Number(age), gender, about, skills, photoUrl }} showButtons={false} />
                    <button className="btn btn-ghost bg-info text-info-content hover:bg-info/80" onClick={() => setPreview(false)}>Back to Edit</button>
                </div>
            )}
        </div>
    );
};
