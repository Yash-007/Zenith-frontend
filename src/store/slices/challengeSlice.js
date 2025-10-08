import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { challengeApi } from '../../services/api';

// Async thunks
export const fetchUserChallenges = createAsyncThunk(
  'challenges/fetchUserChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await challengeApi.getUserChallenges();
      if (response?.success) {
        return response.data;
      }
      return rejectWithValue(response?.response?.data?.message || response?.message);
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch user challenges');
    }
  }
);

export const submitChallenge = createAsyncThunk(
  'challenges/submitChallenge',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await challengeApi.submitChallenge(submissionData);
      if (response?.success) {
        return response;
      }
      return rejectWithValue(response?.response?.data?.message || response?.message);
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to submit challenge');
    }
  }
);

const initialState = {
  challengesByInterest: {},
  pendingChallenge: null,
  loading: false,
  error: null,
  submissionStatus: {
    loading: false,
    error: null,
    success: false,
  },
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    clearSubmissionStatus: (state) => {
      state.submissionStatus = {
        loading: false,
        error: null,
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user challenges
      .addCase(fetchUserChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.challengesByInterest = action.payload.challengesByInterest;
        state.pendingChallenge = action.payload.recentPendingSubmissionChallenge || null;
      })
      .addCase(fetchUserChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit challenge
      .addCase(submitChallenge.pending, (state) => {
        state.submissionStatus.loading = true;
        state.submissionStatus.error = null;
        state.submissionStatus.success = false;
      })
      .addCase(submitChallenge.fulfilled, (state) => {
        state.submissionStatus.loading = false;
        state.submissionStatus.success = true;
      })
      .addCase(submitChallenge.rejected, (state, action) => {
        state.submissionStatus.loading = false;
        state.submissionStatus.error = action.payload;
      });
  },
});

export const { setFeaturedChallenge, clearSubmissionStatus } = challengeSlice.actions;

// Selectors
export const selectChallengesByInterest = (state) => state.challenges.challengesByInterest;
export const selectPendingChallenge = (state) => state.challenges.pendingChallenge;
export const selectChallengesLoading = (state) => state.challenges.loading;
export const selectChallengesError = (state) => state.challenges.error;
export const selectSubmissionStatus = (state) => state.challenges.submissionStatus;

// Helper selector to get all challenges as a flat array
export const selectAllChallenges = (state) => {
  const allChallenges = [];
  Object.values(state.challenges.challengesByInterest).forEach(challenges => {
    allChallenges.push(...challenges);
  });
  return allChallenges;
};

export default challengeSlice.reducer;
