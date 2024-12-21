import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.post(`${BASE_URL}product/AddProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.data.status) {
                return rejectWithValue({ message: response.data.message });
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue({ message: error.response.data.message || error.response.data });
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

const initialState = {
    addProLoading: false,
    addProError: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.addProLoading = true;
                state.addProError = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.addProLoading = false;
                state.addProError = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProLoading = false;
                state.addProError = action.payload;
            })
    },
});

export default productSlice.reducer;