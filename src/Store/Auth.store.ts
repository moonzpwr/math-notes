import { fetchCurrentUser, postLogin, postRegistration } from "@/api/auth"
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "@/helpers/constants"
import type { ICredentials } from "@/interfaces/ICredentials"
import { makeAutoObservable } from "mobx"

class Auth {
    username: string | null = null

    //TODO: Add loading state and error handling

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username: string | null) {
        this.username = username
    }

    registration = ({ username, password }: ICredentials) => {
        postRegistration({ username, password }).then((resp) => resp)
    }

    login = ({ username, password }: ICredentials) => {
        postLogin({ username, password }).then((resp: { username: string, token: string }) => {
            this.setUsername(resp.username)
            localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, resp.token);
        })
    }

    logout = () => {
        this.setUsername(null)
        localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    }

    getCurrentUser = () => {
        fetchCurrentUser().then((resp: { username: string }) => {
            this.setUsername(resp.username)
        })
    }

}

export const AuthStore = new Auth();