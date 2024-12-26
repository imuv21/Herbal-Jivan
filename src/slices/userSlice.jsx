import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const getUsers = createAsyncThunk(
    'user/getUsers',
    async ({ page = 0, userType = 'USER', size = 10 }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.get(`${BASE_URL}admin/get-user`,
                {
                    params: { page, userType, size },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Error fetching users');
            } else if (error.request) {
                return rejectWithValue('No response received from server');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    users: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    pageSize: 10,
    numberOfElements: 0,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    userLoading: false,
    userError: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userError = null;

                state.users = action.payload.data;
                state.currentPage = action.payload.currentPage;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.pageSize = action.payload.pageSize;
                state.numberOfElements = action.payload.numberOfElements;
                state.hasNext = action.payload.hasNext;
                state.hasPrevious = action.payload.hasPrevious;
                state.isFirst = action.payload.isFirst;
                state.isLast = action.payload.isLast;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            })
    },
});

export default userSlice.reducer;