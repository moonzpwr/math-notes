import { Paths } from "@/enums/Paths";
import { useAuth } from "@/hooks/useAuth";
import { LoginView } from "@/Views/LoginView/LoginView";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthProtectedRoute: React.FC = observer(() => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const isError = false; // currentUserDateState === DataState.Rejected;

    useEffect(() => {
        if (isError || !currentUser) {
            navigate(Paths.Login);
        }
    }, [currentUser, isError]);


    return currentUser ? <Outlet /> : <LoginView />;
})