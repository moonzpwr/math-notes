import { AuthStore } from "@/Store/Auth.store";
import { useEffect } from "react";

export const useAuth = () => {
    const { username, getCurrentUser } = AuthStore;

    useEffect(() => {
        if (!username) {
            getCurrentUser();
        }
    }, [username]);

    return username;
}