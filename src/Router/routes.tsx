import { Navigate, Route, Routes } from "react-router-dom"
import { HomeView } from "../Views/HomeView/HomeView"
import { Paths } from "../enums/Paths"
import { LoginView } from "../Views/LoginView/LoginView";
import { RegistrationView } from "../Views/RegistrationView/RegistrationView";
import { AuthProtectedRoute } from "./AuthProtectedRoute/AuthProtectedRoute";
import { DefaultWrapper } from "./DefaultWrapper/DefaultWrapper";

export const AppRoutes: React.FC = () => {
    const { Home, Login, Registration } = Paths;
    return (
        <Routes>
            <Route element={<DefaultWrapper />}>
                <Route element={<AuthProtectedRoute />}>
                    <Route path={Home} element={<HomeView />} >
                        <Route path=":notebookId" element={<HomeView />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path={Login} element={<LoginView />} />
                <Route path={Registration} element={<RegistrationView />} />
                {/* TODO: Add NotFound Page */}
            </Route>
        </Routes>
    )
}