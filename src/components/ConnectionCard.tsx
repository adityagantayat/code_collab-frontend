import type { IFeed } from "../utils/types";

export const ConnectionCard = ({
    id,
    user,
    showButtons = false,
    handleRequest,
}: {
    id: string;
    user: IFeed;
    showButtons: boolean;
    handleRequest?: (requestId: string, status: string) => void;
}) => {
    return (
        <div className="w-full max-w-2xl bg-base-200/70 backdrop-blur-md border border-base-content/10 shadow-lg hover:border-primary/30 rounded-3xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-primary/30 shadow-md shrink-0 bg-base-300">
                <img
                    className="w-full h-full object-cover object-top"
                    src={user.photoUrl || 'https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg'}
                    alt={`${user.firstName} ${user.lastName}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            'https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg';
                    }}
                />
            </div>

            <div className="flex flex-col justify-between flex-1 w-full gap-2">
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-base-content">
                            {user.firstName} {user.lastName}
                        </h3>
                        {(user.age || user.gender) && (
                            <span className="badge badge-sm badge-warning/80 font-medium px-2.5 py-1">
                                {[
                                    user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : null,
                                    user.age ? `${user.age} yrs` : null,
                                ]
                                    .filter(Boolean)
                                    .join(' • ')}
                            </span>
                        )}
                    </div>

                    {user.about && (
                        <p className="text-sm text-base-content/75 line-clamp-2 leading-relaxed mt-1.5">
                            {user.about}
                        </p>
                    )}

                    {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {user.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="badge badge-xs badge-outline badge-primary bg-primary/5 text-[11px] font-medium px-2 py-1.5"
                                >
                                    #{skill.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {showButtons && handleRequest && (
                    <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-base-content/10">
                        <button
                            className="btn btn-sm btn-outline btn-error hover:bg-error hover:text-white rounded-full px-4 gap-1.5 transition-all"
                            onClick={() => handleRequest(id, "rejected")}
                        >
                            <span>✕</span> Reject
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white rounded-full px-5 gap-1.5 shadow-sm shadow-success/20 transition-all hover:scale-105 active:scale-95"
                            onClick={() => handleRequest(id, "accepted")}
                        >
                            <span>✓</span> Accept
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};