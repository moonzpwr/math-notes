import { Paths } from "@/enums/Paths";
import { useAuth } from "@/hooks/useAuth";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthProtectedRoute: React.FC = observer(() => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const isError = false; // currentUserDateState === DataState.Rejected;
    //TODO Create AccessDeniedView component

    useEffect(() => {
        if (isError || !currentUser) {
            navigate(Paths.Login);
        }
    }, [currentUser, isError]);


    return currentUser ? <Outlet /> : <div>You must be logged in to view this page.</div>;
})