import { useDispatch, useSelector } from "react-redux"
import { apiCall } from "../utils/api"
import { setFeed } from "../utils/feedSlice"
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
    useEffect(() => {
        getFeed();
    }, []);

    return feed && (
        <div className="flex justify-center items-center mt-10">
            {/* {feed.map((user) => {
                return <UserCard user={user} key={user._id} />
            })} */}
            <UserCard user={feed[0]} />
        </div>
    )
}