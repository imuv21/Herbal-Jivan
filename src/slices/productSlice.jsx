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
    async ({ page, size, sort = "PRICE_LOW_TO_HIGH" }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}product/getproducts`, {
                params: { page, size, sort },
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

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.delete(`${BASE_URL}product/deleteProduct/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status) {
                return { productId, status: response.data.status };
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

export const addQuestion = createAsyncThunk(
    'product/addQuestion',
    async ({ productId, question }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}product/add-question`, null, {
                params: { productId, question },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while adding the question'
            );
        }
    }
);

export const addReview = createAsyncThunk(
    'product/addReview',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}product/add-review`, formData, {
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
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while adding the question'
            );
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
    isFirst: false,
    isLast: false,
    hasNext: false,
    hasPrevious: false,

    delProLoading: false,
    delProError: null,

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

    addquestLoading: false,
    addquestError: null,

    addrevLoading: false,
    addrevError: null
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
            .addCase(fetchProducts.rejected, (state, action) => {
                state.getProLoading = false;
                state.getProError = action.payload;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.delProLoading = true;
                state.delProError = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.delProLoading = false;
                state.delProError = null;
                state.products = state.products.filter(
                    (product) => product.productId !== action.payload.productId
                );
                state.totalItems -= 1;
                state.numberOfElements -= 1;
                if (state.numberOfElements === 0 && state.hasPrevious) {
                    state.hasPrevious = false;
                }
                if (state.products.length === 0 && state.hasNext) {
                    state.hasNext = false;
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.delProLoading = false;
                state.delProError = action.payload;
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
                    (address) => address.id !== action.payload.addressId
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

            .addCase(addQuestion.pending, (state) => {
                state.addquestLoading = true;
                state.addquestError = null;
            })
            .addCase(addQuestion.fulfilled, (state) => {
                state.addquestLoading = false;
                state.addquestError = null;
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.addquestLoading = false;
                state.addquestError = action.payload;
            })

            .addCase(addReview.pending, (state) => {
                state.addrevLoading = true;
                state.addrevError = null;
            })
            .addCase(addReview.fulfilled, (state) => {
                state.addrevLoading = false;
                state.addrevError = null;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addrevLoading = false;
                state.addrevError = action.payload;
            })
    },
});

export default productSlice.reducer;