import { Auth } from "@/Store/Auth.store";
import { useEffect } from "react";

export const useAuth = () => {
    const { username, getCurrentUser } = Auth;

    useEffect(() => {
        if (!username) {
            getCurrentUser();
        }
    }, [username]);

    return username;
}