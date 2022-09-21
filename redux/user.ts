import { createSlice } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from 'cookies-next';

export interface IUser {
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoURL: string | null;
    uid: string;
}

// @ts-ignore
const initialState: IUser = typeof window !== 'undefined' ? JSON.parse(window?.localStorage.getItem('user')) : {};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState || [],
    reducers: { // @ts-ignore
        setUser: (slice, action) => {
            const user = action.payload;
            window.localStorage.setItem('user', JSON.stringify(user));
            setCookie('authed', true);
            
            return user;
        },
        removeUser: (): any => {
            window.localStorage.removeItem('user');
            deleteCookie('authed');

            return {};
        },
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;