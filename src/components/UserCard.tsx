import type { IFeed } from "../utils/types";

export const UserCard = ({ user, showButtons = true, onSendRequest }: { user: IFeed, showButtons?: boolean, onSendRequest?: (toUserId: string, status: 'interested' | 'ignored') => void }) => {
    return user && (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    className="rounded-t-lg h-[250px]"
                    src={user.photoUrl}
                    alt="Shoes"
                />
            </figure>
            <div className="card-body items-center text-center">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <h2 className="card-title">{user.firstName + ' ' + user.lastName}</h2>
                    <span className="text-warning/50">
                        {user.gender && user.gender.substring(0, 1).toUpperCase() + ','}
                        {user.age && user.age}
                    </span>
                </div>
                <p className="text-neutral-content/50 w-full h-10 overflow-clip">{user.about}</p>
                {user.skills.length > 0 && <span className="text-info/70">{user.skills.join(' | ')}</span>
                }
                {showButtons && onSendRequest && <div className="card-actions gap-8 mt-5">
                    <button className="btn btn-error" onClick={() => onSendRequest(user._id, 'ignored')}>Ignore</button>
                    <button className="btn btn-success" onClick={() => onSendRequest(user._id, 'interested')}>Interested</button>
                </div>}
            </div>
        </div>
    )
}