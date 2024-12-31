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

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}product/getproducts`, {
                params: { page, size },
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

export const fetchProductDetails = createAsyncThunk(
    'product/fetchProductDetails',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}product/product/${productId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addAddress = createAsyncThunk(
    'product/addAddress',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}user/add-address`, formData, {
                headers: {
                    'Content-Type': 'application/json',
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

export const getAddress = createAsyncThunk(
    'product/getAddress',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.get(`${BASE_URL}user/get-address`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;

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

export const deleteAddress = createAsyncThunk(
    'product/deleteAddress',
    async (addressId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.delete(`${BASE_URL}user/delete-address/${addressId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status) {
                return { addressId, status: response.data.status };
            } else {
                return rejectWithValue(response.data.message || 'Failed to delete address');
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while deleting address'
            );
        }
    }
);

export const editAddress = createAsyncThunk(
    'product/editAddress',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}user/update-address`, formData, {
                headers: {
                    'Content-Type': 'application/json',
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

    getProLoading: false,
    getProError: null,
    products: [],
    totalItems: 0,
    totalPages: 0,
    numberOfElements: 0,
    pageSize: 10,
    currentPage: 0,
    isFirst: false,
    isLast: false,
    firstPage: false,
    lastPage: false,
    hasNext: false,
    hasPrevious: false,

    pDetails: null,
    pdLoading: false,
    pdError: null,

    addRessLoading: false,
    addRessError: null,

    addresses: [],
    getaddRessLoading: false,
    getaddRessError: null,

    delAddLoading: false,
    delAddError: null,

    editAddLoading: false,
    editAddError: null,
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

            .addCase(fetchProducts.pending, (state) => {
                state.getProLoading = true;
                state.getProError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.getProLoading = false;
                state.getProError = null;
                const { data, totalItems, totalPages, numberOfElements, pageSize, currentPage, isFirst, isLast, firstPage, lastPage, hasNext, hasPrevious } = action.payload;
                state.products = data;
                state.totalItems = totalItems;
                state.totalPages = totalPages;
                state.numberOfElements = numberOfElements;
                state.pageSize = pageSize;
                state.currentPage = currentPage;
                state.isFirst = isFirst;
                state.isLast = isLast;
                state.firstPage = firstPage;
                state.lastPage = lastPage;
                state.hasNext = hasNext;
                state.hasPrevious = hasPrevious;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.getProLoading = false;
                state.getProError = action.payload;
            })

            .addCase(fetchProductDetails.pending, (state) => {
                state.pdLoading = true;
                state.pdError = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.pdLoading = false;
                state.pdError = null;
                state.pDetails = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.pdLoading = false;
                state.pdError = action.payload || 'Something went wrong';
            })

            .addCase(addAddress.pending, (state) => {
                state.addRessLoading = true;
                state.addRessError = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addRessLoading = false;
                state.addRessError = null;
                if (action.payload) {
                    state.addresses = [...state.addresses, action.payload];
                }
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addRessLoading = false;
                state.addRessError = action.payload;
            })

            .addCase(getAddress.pending, (state) => {
                state.getaddRessLoading = true;
                state.getaddRessError = null;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.getaddRessLoading = false;
                state.getaddRessError = null;
                state.addresses = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.getaddRessLoading = false;
                state.getaddRessError = action.payload;
            })

            .addCase(deleteAddress.pending, (state) => {
                state.delAddLoading = true;
                state.delAddError = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.delAddLoading = false;
                state.delAddError = null;
                state.addresses = state.addresses.filter(
                    (address) => address.id !== action.payload
                );
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.delAddLoading = false;
                state.delAddError = action.payload;
            })

            .addCase(editAddress.pending, (state) => {
                state.editAddLoading = true;
                state.editAddError = null;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.editAddLoading = false;
                state.editAddError = null;
                if (action.payload.data) {
                    state.addresses = state.addresses.map(address =>
                        address.id === action.payload.data.id ? action.payload.data : address
                    );
                }
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.editAddLoading = false;
                state.editAddError = action.payload;
            })
    },
});

export default productSlice.reducer;