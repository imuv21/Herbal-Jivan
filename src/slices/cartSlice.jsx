import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}cart/add-to-cart`, null, {
                params: { productId, quantity },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}cart/get-cart`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
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

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async ({ productId, quantity }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}cart/adjust-item?productId=${productId}&quantity=${quantity}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
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

export const removeCart = createAsyncThunk(
    'cart/removeCart',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}cart/remove-item/${productId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while deleting address'
            );
        }
    }
);


const initialState = {
    cartItems: [],
    totalSellPrice: 0,
    loading: false,
    error: null,

    getLoading: false,
    getError: null,

    updLoading: false,
    updError: null,

    recLoading: false,
    recError: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.totalSellPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCart.pending, (state) => {
                state.getLoading = true;
                state.getError = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.getLoading = false;
                state.getError = null;
                const data = action.payload;
                state.cartItems = data.cartItems;
                state.totalSellPrice = data.totalSellPrice;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.getLoading = false;
                state.getError = action.payload;
            })

            .addCase(updateCart.pending, (state) => {
                state.updLoading = true;
                state.updError = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.updLoading = false;
                state.updError = null;
                const data = action.payload;
                state.cartItems = data.cartItems;
                state.totalSellPrice = data.totalSellPrice;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.updLoading = false;
                state.updError = action.payload;
            })

            .addCase(removeCart.pending, (state) => {
                state.recLoading = true;
                state.recError = null;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.recLoading = false;
                state.recError = null;
                const data = action.payload;
                state.cartItems = data.cartItems;
                state.totalSellPrice = data.totalSellPrice;
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.recLoading = false;
                state.recError = action.payload;
            })
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
