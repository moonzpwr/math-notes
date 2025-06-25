import { httpClient } from "@/helpers/httpClient";
import type { ICredentials } from "@/interfaces/ICredentials";

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const postRegistration = (payload: ICredentials) => fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: payload.username,
        password: payload.password,
    }),
}).then(res => res.json())

export const postLogin = (payload: ICredentials) => fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: payload.username,
        password: payload.password,
    }),
}).then(res => res.json())

export const fetchCurrentUser = () => httpClient(`${BASE_URL}/currentUser`, {
    method: 'GET',
}).then(res => res.json())
