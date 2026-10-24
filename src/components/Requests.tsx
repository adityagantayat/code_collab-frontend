import { useEffect } from "react";
import { apiCall } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { removeRequests, setRequests } from "../utils/requestsSlice";
import { ConnectionCard } from "./ConnectionCard";
import { Link } from "react-router-dom";

export const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state: RootState) => state.requests);

    const fetchRequests = async () => {
        try {
            const res = await apiCall("/user/requests/received", "GET");
            dispatch(setRequests(res?.data?.data));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRequest = async (requestId: string, status: string) => {
        try {
            await apiCall(`/requests/review/${status}/${requestId}`, "PATCH", {});
            dispatch(removeRequests(requestId));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-4">
            <div className="text-center mb-8">
                <span className="badge badge-sm badge-neutral/80 border border-base-content/10 text-xs px-3 py-1 mb-2 font-medium">
                    Requests • {requests?.length || 0} Pending
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                    Incoming Requests
                </h1>
                <p className="text-sm text-base-content/60 mt-1 max-w-md">
                    Review developers interested in teaming up with you.
                </p>
            </div>

            {requests?.length ? (
                <div className="flex flex-col items-center gap-4 w-full">
                    {requests.map((request) => {
                        const user = request.fromUserId;
                        return (
                            <ConnectionCard
                                key={request._id}
                                id={request._id}
                                user={user}
                                showButtons={true}
                                handleRequest={handleRequest}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-base-200/80 border border-base-content/10 flex items-center justify-center text-3xl shadow-xl mb-5">
                        📬
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-base-content">
                        No Incoming Requests
                    </h2>
                    <p className="text-sm text-base-content/60 max-w-sm mt-1.5 mb-6 leading-relaxed">
                        When other developers discover your profile and want to connect, their invitations will appear here.
                    </p>
                    <Link to="/" className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-primary/30">
                        Discover Developers
                    </Link>
                </div>
            )}
        </div>
    );
};