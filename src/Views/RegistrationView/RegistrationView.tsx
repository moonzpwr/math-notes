
import { Paths } from "@/enums/Paths";
import { useAuth } from "@/hooks/useAuth";
import type { IRegistrationCredentials } from "@/interfaces/ICredentials";
import { AuthStore } from "@/Store/Auth.store";
import { Button, Paper, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationView.module.css";


export const RegistrationView: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const { registration } = AuthStore;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleRegistration = ({ username, password, confirmPassword }: IRegistrationCredentials) => {
        if (username && password && confirmPassword && password === confirmPassword) {
            registration({ username, password });
        }
        return;
        //TODO: handle error
    }

    useEffect(() => {
        if (currentUser) {
            navigate(Paths.Home);
        }
    }, [currentUser]);


    return (
        <div className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <h1>Please enter registration data!</h1>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Confirm password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* TODO: Add validation */}
                <Button
                    variant="contained"
                    onClick={() => handleRegistration({ username, password, confirmPassword })}
                >
                    Registration
                </Button>
                Already have an account?{" "}
                <Button variant="text" onClick={() => navigate(Paths.Login)}>Login</Button>
            </Paper>
        </div>
    )
}