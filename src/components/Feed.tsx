import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../utils/api";
import { setFeed, updateFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import type { RootState } from "../utils/appStore";
import type { IFeed } from "../utils/types";
import { UserCard } from "./UserCard";
import { Link } from "react-router-dom";

export const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store: RootState) => store.feed);

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await apiCall('/user/feed', 'GET');
            dispatch(setFeed(res.data.data as IFeed[]));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendRequest = async (toUserId: string, status: 'interested' | 'ignored') => {
        try {
            await apiCall(`/requests/send/${status}/${toUserId}`, 'POST', {});
            dispatch(updateFeed({ userId: toUserId }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (feed?.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-20 h-20 rounded-3xl bg-base-200/80 border border-base-content/10 flex items-center justify-center text-3xl shadow-xl mb-6">
                    ✨
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-base-content">
                    You're all caught up!
                </h2>
                <p className="text-sm text-base-content/60 max-w-sm mt-2 mb-8 leading-relaxed">
                    There are no new developer profiles in your feed right now. Check back soon or manage your pending requests.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/requests" className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-primary/30">
                        View Requests
                    </Link>
                    <Link to="/connections" className="btn btn-outline rounded-full px-6">
                        My Connections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        feed && feed.length > 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div className="text-center mb-6">
                    <span className="badge badge-sm badge-neutral/80 border border-base-content/10 text-xs px-3 py-1 mb-2 font-medium">
                        Developer Feed • {feed.length} remaining
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                        Find Your Next Co-builder
                    </h1>
                </div>

                <div className="w-full flex justify-center">
                    <UserCard user={feed[0]} onSendRequest={handleSendRequest} />
                </div>
            </div>
        )
    );
};