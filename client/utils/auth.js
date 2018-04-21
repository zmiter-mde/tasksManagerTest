import { TOKEN } from '../utils/constants';

export const isAuthorised = () => {
    return sessionStorage.getItem(TOKEN)
};

export const logout = () => {
    console.log('Logout called');
    sessionStorage.removeItem(TOKEN);
};

export const authorise = (token) => {
    console.log('Login called');
    sessionStorage.setItem(TOKEN, token);
};