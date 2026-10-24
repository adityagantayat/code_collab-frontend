import { useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
    const user = useSelector((store: RootState) => store.user);
    return (
        <div>
            {user && <EditProfile user={user} />}
        </div>
    );
}