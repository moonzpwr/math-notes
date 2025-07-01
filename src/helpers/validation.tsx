import * as Yup from 'yup';
import { PASSWORD_REGEX, USERNAME_REGEX } from './constants';


export const authValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(16, 'Maximum 16 characters')
        .matches(/[A-Za-z]/, 'Must contain at least one Latin letter')
        .matches(USERNAME_REGEX, 'Only Latin letters, numbers and periods are allowed')
        .required('Required'),

    password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .max(20, 'Maximum 20 characters')
        .matches(/[A-Z]/, 'Must contain at least one capital letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one digit')
        .matches(PASSWORD_REGEX, 'Invalid characters')
        .required('Required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')

});