import { fetchCurrentUser, postLogin, postRegistration } from "@/api/auth";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "@/helpers/constants";
import type { ICredentials } from "@/interfaces/ICredentials";
import { makeAutoObservable } from "mobx";
import { notificationsStore } from "@/Store/Notifications.store";
import { DataState } from "@/enums/DataState";

const { showNotification } = notificationsStore;

class AuthStore {
    username: string | null = null;
    userState: DataState = DataState.Idle;
    registrationState: DataState = DataState.Idle;

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username: string | null) {
        this.username = username
    }

    registration = async ({ username, password }: ICredentials) => {
        this.registrationState = DataState.Pending;
        try {
            await postRegistration({ username, password });
            this.registrationState = DataState.Fulfilled;
            showNotification(`Registration successful! Please login!`);
        } catch (error: any) {
            this.registrationState = DataState.Rejected;
            showNotification(`There was a problem with the login: ${error.message}`);
        }
    }

    login = async ({ username, password }: ICredentials) => {
        this.userState = DataState.Pending;
        try {
            const resp = await postLogin({ username, password });
            this.setUsername(resp.username);
            localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, resp.token);
            this.userState = DataState.Fulfilled;
            showNotification(`Login successful! Welcome, ${resp.username}!`);
        } catch (error: any) {
            this.userState = DataState.Rejected;
            showNotification(`There was a problem with the login: ${error.message}`);
        }
    };

    logout = () => {
        this.setUsername(null)
        localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
        this.userState = DataState.Idle;
    }

    getCurrentUser = async () => {
        this.userState = DataState.Pending;
        try {
            const resp = await fetchCurrentUser();
            this.setUsername(resp.username);
            this.userState = DataState.Fulfilled;
        } catch (error) {
            this.userState = DataState.Rejected;
            console.log(error)//TODO: DO we need this handler????
        }
    }

}

export const authStore = new AuthStore();