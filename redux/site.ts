import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    error: null,
    success: null,
    title: '',
    contactModal: false
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
        }
    }
});

export const { setLoading, setSuccess, setError, setTitle, setContactModal } = siteSlice.actions;
export default siteSlice.reducer;