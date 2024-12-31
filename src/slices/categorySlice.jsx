import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const categoryProducts = createAsyncThunk(
    'category/categoryProducts',
    async ({ page = 0, size = 10, category = '' }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}product/getproducts`, {
                params: { page, size, category },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Error fetching products');
            } else if (error.request) {
                return rejectWithValue('No response received from server');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    getProLoading: false,
    getProError: null,
    products: [],
    totalItems: 0,
    totalPages: 0,
    numberOfElements: 0,
    isFirst: false,
    isLast: false,
    hasNext: false,
    hasPrevious: false
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoryProducts.pending, (state) => {
                state.getProLoading = true;
                state.getProError = null;
            })
            .addCase(categoryProducts.fulfilled, (state, action) => {
                state.getProLoading = false;
                state.getProError = null;
                const { data, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious } = action.payload;
                state.products = data;
                state.totalItems = totalItems;
                state.totalPages = totalPages;
                state.numberOfElements = numberOfElements;
                state.isFirst = isFirst;
                state.isLast = isLast;
                state.hasNext = hasNext;
                state.hasPrevious = hasPrevious;
            })
            .addCase(categoryProducts.rejected, (state, action) => {
                state.getProLoading = false;
                state.getProError = action.payload;
            })
    },
});

export default categorySlice.reducer;