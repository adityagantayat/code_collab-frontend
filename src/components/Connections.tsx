import { apiCall } from "../utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionSlice";
import type { RootState } from "../utils/appStore";
import { ConnectionCard } from "./ConnectionCard";
import type { IFeed } from "../utils/types";

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
        <div className="flex justify-center m-10">
            {connections?.length ? (
                connections?.map((connection: IFeed) => {
                    return (
                        <ConnectionCard key={connection._id} id={connection._id.toString()} user={connection} showButtons={false} />)
                })
            ) : (<div>
                <h1>No Connections </h1>
            </div>)}
        </div>
    );
};