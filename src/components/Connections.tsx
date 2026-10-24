import { apiCall } from "../utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionSlice";
import type { RootState } from "../utils/appStore";
import { ConnectionCard } from "./ConnectionCard";
import type { IFeed } from "../utils/types";
import { Link } from "react-router-dom";

export const Connections = () => {
    const connections = useSelector((state: RootState) => state.connections);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        const fetchConnections = async () => {
            try {
                const res = await apiCall("/user/connections", "GET");
                if (isMounted && res?.data?.data) {
                    dispatch(setConnections(res.data.data));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchConnections();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-4">
            <div className="text-center mb-8">
                <span className="badge badge-sm badge-neutral/80 border border-base-content/10 text-xs px-3 py-1 mb-2 font-medium">
                    Network • {connections?.length || 0} Connected
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                    Your Connections
                </h1>
                <p className="text-sm text-base-content/60 mt-1 max-w-md">
                    Engineers you have successfully matched with. Reach out and start collaborating!
                </p>
            </div>

            {connections?.length ? (
                <div className="flex flex-col items-center gap-4 w-full">
                    {connections.map((connection: IFeed) => (
                        <ConnectionCard
                            key={connection._id}
                            id={connection._id.toString()}
                            user={connection}
                            showButtons={false}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-base-200/80 border border-base-content/10 flex items-center justify-center text-3xl shadow-xl mb-5">
                        🤝
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-base-content">
                        No Connections Yet
                    </h2>
                    <p className="text-sm text-base-content/60 max-w-sm mt-1.5 mb-6 leading-relaxed">
                        Start swiping on your developer feed to discover peers and build your team.
                    </p>
                    <Link to="/" className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-primary/30">
                        Explore Feed
                    </Link>
                </div>
            )}
        </div>
    );
};