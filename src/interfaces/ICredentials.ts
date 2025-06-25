export interface ICredentials {
    username: string;
    password: string;
}

export interface IRegistrationCredentials extends ICredentials {
    confirmPassword: string;
}