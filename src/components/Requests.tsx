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
    }
    const handleRequest = async (requestId: string, status: string) => {
        try {
            await apiCall(`/requests/review/${status}/${requestId}`, "PATCH", {});
            dispatch(removeRequests(requestId));
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex flex-col w-4/5 justify-center items-center gap-2">
                {requests?.length ? (
                    requests.map((request) => {
                        const user = request.fromUserId;
                        return (
                            <ConnectionCard key={request._id} id={request._id} user={user} showButtons={true} handleRequest={handleRequest} />)
                    })
                ) : (
                    <>
                        <p>No new requests yet.</p>
                        <Link to='/' className="btn btn-primary">Make some connections</Link>
                    </>
                )}
            </div>
        </div>
    )
}