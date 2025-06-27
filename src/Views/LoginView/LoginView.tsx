import { Paths } from "@/enums/Paths"
import { useAuth } from "@/hooks/useAuth"
import { authStore } from "@/Store/Auth.store"
import { Button, Paper, TextField } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./LoginView.module.css"
import type { ICredentials } from "@/interfaces/ICredentials"
import { DataState } from "@/enums/DataState"

export const LoginView: React.FC = observer(() => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const { login, userState } = authStore;
    const isLoading = userState === DataState.Pending;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleLogin = ({ username, password }: ICredentials) => {
        if (username && password) {
            login({ username, password });
        }
        return;
    }

    useEffect(() => {
        if (currentUser) {
            navigate(Paths.Home);
        }
    }, [currentUser]);

    return (
        <div className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <h1>Please login!</h1>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {/* TODO: Add validation */}
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={() => handleLogin({ username, password })} loading={isLoading}>Login</Button>
                Don't have an account?{" "}
                <Button variant="text" onClick={() => navigate(Paths.Registration)}>Register</Button>
            </Paper>
        </div>
    )
})