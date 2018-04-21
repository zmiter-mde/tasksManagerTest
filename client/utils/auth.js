import { AUTH_TOKEN, SERVER_TOKEN } from '../utils/constants';
import md5 from 'md5';

export const isAuthorised = () => {
    return sessionStorage.getItem(AUTH_TOKEN)
};

export const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
};

export const authorise = (token) => {
    sessionStorage.setItem(AUTH_TOKEN, token);
};

export const createSignature = (task) => {
    let requestString = `status=${task.status}&text=${encodeURI(task.text)}&token=${SERVER_TOKEN}`;
    return md5(requestString);
};