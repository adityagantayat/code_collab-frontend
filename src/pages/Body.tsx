import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { apiCall } from "../utils/api";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import axios from "axios";
import type { RootState } from "../utils/appStore";

export const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store: RootState) => store.user);
    const fetchUser = useCallback(async () => {
        if (userData || location.pathname === '/login' || location.pathname === '/signup') return;
        try {
            const res = await apiCall('/profile/view', 'GET');
            if (res) {
                dispatch(addUser(res.data.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.status === 401) {
                navigate('/login');
            } else {
                console.error("Error fetching user:", error);
            }
        }
    }, [dispatch, navigate, userData, location]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content relative selection:bg-primary/20 selection:text-primary">
            <div className="ambient-glow" />
            <Navbar />
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 relative z-10 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};