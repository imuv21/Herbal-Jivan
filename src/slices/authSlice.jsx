import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}user/signup`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data.status) {
                return rejectWithValue(response.data);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ otp, email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}verifyOtp?otp=${otp}&role=User&username=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success === false) {
                return rejectWithValue(response.data.message);
            }
            return response.data.message;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}user/Login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
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

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}user/forgot-password`, userData, {
                headers: {
                    'Content-Type': 'application/json',
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

export const verifyPassword = createAsyncThunk(
    'auth/verifyPassword',
    async ({ otp, username }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}forgot-password/verify?otp=${otp}&role=USER&username=${username}`, {
                headers: {
                    'Content-Type': 'application/json',
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

    user: null,
    token: null,

    signupData: null,
    signLoading: false,
    signErrors: {},

    logLoading: false,
    logError: null,

    otpLoading: false,
    otpError: null,

    emailData: null,
    fopaLoading: false,
    fopaError: null,

    vepaLoading: false,
    vepaError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.signErrors = null;
            state.logError = null;
            state.otpError = null;
            state.fopaError = null;
            state.vepaError = null;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setEmailData: (state, action) => {
            state.emailData = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.signupData = null;
            state.email = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.signLoading = true;
                state.signErrors = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.signLoading = false;
                state.signErrors = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.signLoading = false;
                state.signErrors = action.payload?.data || {};
            })

            .addCase(verifyOtp.pending, (state) => {
                state.otpLoading = true;
                state.otpError = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpLoading = false;
                state.otpError = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.otpLoading = false;
                state.otpError = action.payload.message || "Unknown error occurred";
            })
         
            .addCase(loginUser.pending, (state) => {
                state.logLoading = true;
                state.logError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.logLoading = false;
                state.logError = null;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.logLoading = false;
                state.logError = action.payload?.message || 'Something went wrong';
            })

            .addCase(forgotPassword.pending, (state) => {
                state.fopaLoading = true;
                state.fopaError = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.fopaLoading = false;
                state.fopaError = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.fopaLoading = false;
                state.fopaError = action.payload?.message || 'Something went wrong';
            })

            .addCase(verifyPassword.pending, (state) => {
                state.vepaLoading = true;
                state.vepaError = null;
            })
            .addCase(verifyPassword.fulfilled, (state) => {
                state.vepaLoading = false;
                state.vepaError = null;
            })
            .addCase(verifyPassword.rejected, (state, action) => {
                state.vepaLoading = false;
                state.vepaError = action.payload.message || "Unknown error occurred";
            })
    },
});


export const { clearErrors, setSignupData, setEmailData, logout } = authSlice.actions;
export default authSlice.reducer;