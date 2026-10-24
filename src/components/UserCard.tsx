import type { IFeed } from "../utils/types";

export const UserCard = ({
    user,
    showButtons = true,
    onSendRequest,
}: {
    user: IFeed;
    showButtons?: boolean;
    onSendRequest?: (toUserId: string, status: 'interested' | 'ignored') => void;
}) => {
    return (
        user && (
            <div className="card bg-base-200/80 backdrop-blur-md border border-base-content/10 w-80 sm:w-96 shadow-xl hover:border-primary/30 transition-all duration-300 rounded-3xl overflow-hidden flex flex-col items-center">
                <figure className="pt-6 px-6 w-full flex justify-center">
                    <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-2 ring-primary/30 shadow-lg bg-base-300 relative">
                        <img
                            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                            src={user.photoUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    'https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg';
                            }}
                        />
                    </div>
                </figure>

                <div className="card-body items-center text-center px-6 pt-3 pb-6 w-full">
                    <div className="flex flex-col items-center gap-1">
                        <h2 className="card-title text-xl font-bold tracking-tight text-base-content">
                            {user.firstName} {user.lastName}
                        </h2>
                        {(user.gender || user.age) && (
                            <span className="badge badge-sm badge-warning/80 font-medium px-2.5 py-1 text-xs">
                                {[
                                    user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : null,
                                    user.age ? `${user.age} yrs` : null,
                                ]
                                    .filter(Boolean)
                                    .join(' • ')}
                            </span>
                        )}
                    </div>

                    <p className="text-xs sm:text-sm text-base-content/70 mt-1 line-clamp-2 leading-relaxed">
                        {user.about || <span className="italic opacity-40">No bio provided</span>}
                    </p>

                    {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                            {user.skills.slice(0, 5).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="badge badge-xs badge-outline badge-primary bg-primary/5 text-[11px] font-medium px-2 py-1"
                                >
                                    #{skill.trim()}
                                </span>
                            ))}
                            {user.skills.length > 5 && (
                                <span className="badge badge-xs badge-ghost text-[10px]">
                                    +{user.skills.length - 5}
                                </span>
                            )}
                        </div>
                    )}

                    {showButtons && onSendRequest && (
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-base-content/10 w-full">
                            <button
                                className="btn btn-circle btn-outline btn-error hover:bg-error hover:text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                                onClick={() => onSendRequest(user._id, 'ignored')}
                                title="Ignore"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <button
                                className="btn btn-circle btn-success text-white shadow-lg shadow-success/30 hover:scale-105 active:scale-95 transition-all"
                                onClick={() => onSendRequest(user._id, 'interested')}
                                title="Interested"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};