import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: null,
    title: '',
    contactModal: false,
    userModal: false,
};

const siteSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLoading: (slice, action) => {
            slice.loading = action.payload;
        },
        setSuccess: (slice, action) => {
            slice.success = action.payload
        },
        setError: (slice, action) => {
            slice.error = action.payload;
        },
        setTitle: (slice, action) => {
            slice.title = action.payload;
        },
        setContactModal: (slice, action) => {
            slice.contactModal = action.payload
        },
        setUserModal: (slice, action) => {
            slice.userModal = action.payload
        }
    }
});

export const { setLoading, setSuccess, setError, setTitle, setContactModal, setUserModal, } = siteSlice.actions;
export default siteSlice.reducer;