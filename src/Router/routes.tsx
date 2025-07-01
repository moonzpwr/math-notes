import { Route, Routes } from "react-router-dom"
import { HomeView } from "../Views/HomeView/HomeView"
import { Paths } from "../enums/Paths"
import { LoginView } from "../Views/LoginView/LoginView";
import { RegistrationView } from "../Views/RegistrationView/RegistrationView";
import { AuthProtectedRoute } from "./AuthProtectedRoute/AuthProtectedRoute";
import { DefaultWrapper } from "./DefaultWrapper/DefaultWrapper";
import { NotFoundView } from "@/Views/NotFoundView/NotFoundView";
import { CustomEditor } from "@/Views/Editor";


export const AppRoutes: React.FC = () => {
    const { Home, Login, Registration } = Paths;
    return (
        <Routes>
            <Route element={<DefaultWrapper />}>
                <Route element={<AuthProtectedRoute />}>
                    <Route path={Home} element={<HomeView />} >
                        <Route path=":notebookId" element={<HomeView />} />
                    </Route>
                    <Route path="editor" element={<CustomEditor />} />
                </Route>
                <Route path={Login} element={<LoginView />} />
                <Route path={Registration} element={<RegistrationView />} />
                <Route path="*" element={<NotFoundView />} />
            </Route>
        </Routes>
    )
}