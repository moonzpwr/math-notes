import { Route, Routes } from "react-router-dom"
import { ProjectView } from "../Views/ProjectView/ProjectView"
import { Paths } from "../enums/Paths"
import { LoginView } from "../Views/LoginView/LoginView";
import { RegistrationView } from "../Views/RegistrationView/RegistrationView";
import { AuthProtectedRoute } from "./AuthProtectedRoute/AuthProtectedRoute";
import { DefaultWrapper } from "./DefaultWrapper/DefaultWrapper";
import { NotFoundView } from "@/Views/NotFoundView/NotFoundView";
import { CustomEditor } from "@/Views/Editor";
import { HomeView } from "@/Views/HomeView/HomeView";


export const AppRoutes: React.FC = () => {
    const { Home, Login, Registration, Project } = Paths;
    return (
        <Routes>
            <Route element={<DefaultWrapper />}>
                <Route element={<AuthProtectedRoute />}>
                    <Route path={Project} element={<ProjectView />} >
                        <Route path=":notebookId" element={<ProjectView />} />
                    </Route>
                    {/* TODO: Add protected route by role 'admin' for editor */}
                    <Route path="editor" element={<CustomEditor />} />
                </Route>
                <Route path={Home} element={<HomeView />} />
                <Route path={Login} element={<LoginView />} />
                <Route path={Registration} element={<RegistrationView />} />
                <Route path="*" element={<NotFoundView />} />
            </Route>
        </Routes>
    )
}   