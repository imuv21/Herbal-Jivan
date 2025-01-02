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

export const getReviews = createAsyncThunk(
    'user/getReviews',
    async ({ page = 0, status = 'PENDING', size = 10 }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}admin/get-reviews`,
                {
                    params: { page, status, size },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;

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

export const deleteReview = createAsyncThunk(
    'user/deleteReview',
    async (reviewId, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}admin/delete-review/${reviewId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response?.data?.status) {
                return { reviewId, status: response.data.status };
            } else {
                const errorMessage = response?.data?.message || 'Failed to delete the question';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while deleting address'
            );
        }
    }
);

export const updateStatus = createAsyncThunk(
    'user/updateStatus',
    async ({ reviewId, status }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}admin/update-review-status`,{},{
                    params: { reviewId, status },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Something went wrong'
            ); 
        }
    }
);

export const getQuestion = createAsyncThunk(
    'user/getQuestion',
    async ({ page = 0, status = 'NOT_REPLIED', size = 10 }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}admin/get-questions`,
                {
                    params: { page, status, size },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;

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

export const deleteQuestion = createAsyncThunk(
    'user/deleteQuestion',
    async (id, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}admin/delete-question/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response?.data?.status) {
                return { id, status: response.data.status };
            } else {
                const errorMessage = response?.data?.message || 'Failed to delete the question';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error occurred while deleting address'
            );
        }
    }
);

export const replyQuestion = createAsyncThunk(
    'user/replyQuestion',
    async ({ id, message }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.patch(`${BASE_URL}admin/reply-question`,{},{
                    params: { id, message },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Something went wrong'
            ); 
        }
    }
);

const initialState = {
    users: [],
    totalItems: 0,
    totalPages: 0,
    numberOfElements: 0,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    userLoading: false,
    userError: null,

    reviews: [],
    reviewLoading: false,
    reviewError: null,

    delRevLoading: false,
    delRevError: null,

    questions: [],
    questLoading: false,
    questError: null,

    delQuestLoading: false,
    delQuestError: null,

    repLoading: false,
    repError: null,

    updateLoading: false,
    updateError: null
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
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
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

            .addCase(getReviews.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = null;
                const data = action.payload.data;
                state.reviews = data.data;
                state.totalItems = data.totalItems;
                state.totalPages = data.totalPages;
                state.hasNext = data.hasNext;
                state.hasPrevious = data.hasPrevious;
                state.isFirst = data.isFirst;
                state.isLast = data.isLast;
                state.numberOfElements = data.numberOfElements;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || 'Something went wrong';
            })

            .addCase(deleteReview.pending, (state) => {
                state.delRevLoading = true;
                state.delRevError = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.delRevLoading = false;
                state.delRevError = null;
                state.reviews = state.reviews?.filter(
                    (review) => review.id !== action.payload
                ) || [];
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.delRevLoading = false;
                state.delRevError = action.payload;
            })

            .addCase(getQuestion.pending, (state) => {
                state.questLoading = true;
                state.questError = null;
            })
            .addCase(getQuestion.fulfilled, (state, action) => {
                state.questLoading = false;
                state.questError = null;
                const data = action.payload.data;
                state.questions = data.data;
                state.totalItems = data.totalItems;
                state.totalPages = data.totalPages;
                state.hasNext = data.hasNext;
                state.hasPrevious = data.hasPrevious;
                state.isFirst = data.isFirst;
                state.isLast = data.isLast;
                state.numberOfElements = data.numberOfElements;
            })
            .addCase(getQuestion.rejected, (state, action) => {
                state.questLoading = false;
                state.questError = action.payload || 'Something went wrong';
            })

            .addCase(deleteQuestion.pending, (state) => {
                state.delQuestLoading = true;
                state.delQuestError = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.delQuestLoading = false;
                state.delQuestError = null;
                state.questions = state.questions?.filter(
                    (question) => question.id !== action.payload
                ) || [];
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.delQuestLoading = false;
                state.delQuestError = action.payload;
            })

            .addCase(replyQuestion.pending, (state) => {
                state.repLoading = true;
                state.repError = null;
            })
            .addCase(replyQuestion.fulfilled, (state) => {
                state.repLoading = false;
                state.repError = null;
            })
            .addCase(replyQuestion.rejected, (state, action) => {
                state.repLoading = false;
                state.repError = action.payload;
            })

            .addCase(updateStatus.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateStatus.fulfilled, (state) => {
                state.updateLoading = false;
                state.updateError = null;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            })
    },
});

export default userSlice.reducer;