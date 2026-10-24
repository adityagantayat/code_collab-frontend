import { useDispatch, useSelector } from "react-redux"
import { apiCall } from "../utils/api"
import { setFeed, updateFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import type { RootState } from "../utils/appStore"
import type { IFeed } from "../utils/types"
import { UserCard } from "./UserCard"

export const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store: RootState) => store.feed);
    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await apiCall('/user/feed', 'GET');
            console.log(res.data.data)
            dispatch(setFeed(res.data.data as IFeed[]));
        } catch (error) {
            console.log(error);
        }
    }
    const handleSendRequest = async (toUserId: string, status: 'interested' | 'ignored') => {
        try {
            const res = await apiCall(`/requests/send/${status}/${toUserId}`, 'POST', {});
            dispatch(updateFeed({ userId: toUserId }));
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getFeed();
    }, []);
    if (feed?.length === 0) return <p className="flex justify-center items-center mt-24">No new users found</p>
    return feed?.length > 0 && (
        <div className="flex justify-center items-center mt-10">
            <UserCard user={feed[0]} onSendRequest={handleSendRequest} />
        </div>
    )
}