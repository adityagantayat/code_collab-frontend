import type { IFeed } from "../utils/types";

export const ConnectionCard = ({ id, user, showButtons = false, handleRequest }: { id: string, user: IFeed, showButtons: boolean, handleRequest?: (requestId: string, status: string) => void }) => {
    return (
        <div className="bg-neutral-200 dark:bg-neutral-700 w-[700px] h-[200px] p-2 rounded-lg">
            <div className="flex gap-4">
                <div className="rounded-full w-20 h-20">
                    <img className="w-full h-full object-cover rounded-full" src={user.photoUrl || ''} alt="" />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <p>{user.firstName + " " + user.lastName}</p>
                        {(user.age || user.gender) && (
                            <span className="text-primary/50">
                                {[user.age, user.gender].filter(Boolean).join(", ")}
                            </span>
                        )}
                    </div>
                    {user.about && <p>{user.about}</p>}
                    {user.skills?.length > 0 && <span>{user.skills.join(", ")}</span>}
                    {showButtons && (<div className="justify-end flex gap-2 ">
                        <button className="btn btn-outline btn-error" onClick={() => handleRequest(id, "rejected")}>Reject</button>
                        <button className="btn btn-outline btn-success" onClick={() => handleRequest(id, "accepted")}>Accept</button>
                    </div>)}
                </div>
            </div>
        </div>
    );
};