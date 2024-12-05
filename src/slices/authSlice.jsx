import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://herbal-jeevan-9dl6.onrender.com/api/user/signup`, userData, {
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
            const response = await axios.post(`https://herbal-jeevan-9dl6.onrender.com/api/verifyOtp?otp=${otp}&role=User&username=${email}`, {
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

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async ({ email, password }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/auth/delete-user`, {
                data: { email, password },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.status === 'failed') {
                return rejectWithValue(response.data.message);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://herbal-jeevan-9dl6.onrender.com/api/user/Login`, userData, {
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

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.put(`${BASE_URL}/auth/update-profile`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success === false || response.data.status === 'failed') {
                return rejectWithValue(response.data.errors || { message: response.data.message });
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const updateDetails = createAsyncThunk(
    'auth/updateDetails',
    async (detailData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.put(`${BASE_URL}/auth/update-details`, detailData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success === false || response.data.status === 'failed') {
                return rejectWithValue(response.data.errors || { message: response.data.message });
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const updateShows = createAsyncThunk(
    'auth/updateShows',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.put(`${BASE_URL}/auth/update-shows`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success === false || response.data.status === 'failed') {
                return rejectWithValue(response.data.errors || { message: response.data.message });
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
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

    delUserLoading: false,
    delUserError: null,

    upLoading: false,
    upError: null,
    upGenErrors: null,

    details: {
        age: null,
        gender: '',
        height: null,
        location: '',
        bodyType: '',
        drinking: '',
        smoking: '',
        relationshipStatus: '',
    },
    detLoading: false,
    detError: null,
    detGenErrors: null,

    upshowLoading: false,
    upshowErrors: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.signErrors = null;
            state.logError = null;
            state.otpError = null;
            state.delUserError = null;
            state.upError = null;
            state.upGenErrors = null;
            state.detError = null;
            state.detGenErrors = null;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.signupData = null;
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
            .addCase(deleteUser.pending, (state) => {
                state.delUserLoading = true;
                state.delUserError = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.delUserLoading = false;
                state.delUserError = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.delUserLoading = false;
                state.delUserError = action.payload.message || "Unknown error occurred";
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
            .addCase(updateProfile.pending, (state) => {
                state.upLoading = true;
                state.upError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.upLoading = false;
                state.user = {
                    ...state.user,
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    interests: action.payload.user.interests,
                    links: action.payload.user.links
                };
                state.upError = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.upLoading = false;
                if (Array.isArray(action.payload)) {
                    state.upError = action.payload;
                } else {
                    state.upGenErrors = action.payload?.message || "Unknown error occurred";
                }
            })
            .addCase(updateDetails.pending, (state) => {
                state.detLoading = true;
                state.detError = null;
            })
            .addCase(updateDetails.fulfilled, (state, action) => {
                state.detLoading = false;
                state.details = {
                    age: action.payload.user.details.age,
                    gender: action.payload.user.details.gender,
                    height: action.payload.user.details.height,
                    location: action.payload.user.details.location,
                    bodyType: action.payload.user.details.bodyType,
                    drinking: action.payload.user.details.drinking,
                    smoking: action.payload.user.details.smoking,
                    relationshipStatus: action.payload.user.details.relationshipStatus,
                };
                state.detError = null;
            })
            .addCase(updateDetails.rejected, (state, action) => {
                state.detLoading = false;
                if (Array.isArray(action.payload)) {
                    state.detError = action.payload;
                } else {
                    state.detGenErrors = action.payload?.message || "Unknown error occurred";
                }
            })
            .addCase(updateShows.pending, (state) => {
                state.upshowLoading = true;
                state.upshowErrors = null;
            })
            .addCase(updateShows.fulfilled, (state, action) => {
                state.upshowLoading = false;
                state.user = {
                    ...state.user,
                    shows: action.payload.user.shows
                };
                state.upshowErrors = null;
            })
            .addCase(updateShows.rejected, (state, action) => {
                state.upshowLoading = false;
                state.upshowErrors = action.payload?.message || "Unknown error occurred";
            })
    },
});


export const { clearErrors, setSignupData, logout } = authSlice.actions;
export default authSlice.reducer;