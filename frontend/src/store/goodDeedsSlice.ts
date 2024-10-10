import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface GoodDeed {
  id: number;
  content: string;
}

interface GoodDeedsState {
  deeds: GoodDeed[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoodDeedsState = {
  deeds: [],
  status: 'idle',
  error: null,
};

export const fetchGoodDeeds = createAsyncThunk(
  'goodDeeds/fetchGoodDeeds',
  async (userId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/good-deeds/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
);

const goodDeedsSlice = createSlice({
  name: 'goodDeeds',
  initialState,
  reducers: {
    setDeeds: (state, action: PayloadAction<GoodDeed[]>) => {
      state.deeds = action.payload;
    },
    addDeed: (state, action: PayloadAction<GoodDeed>) => {
      state.deeds.push(action.payload);
    },
    updateDeed: (state, action: PayloadAction<GoodDeed>) => {
      const index = state.deeds.findIndex(
        (deed) => deed.id === action.payload.id,
      );
      if (index !== -1) {
        state.deeds[index] = action.payload;
      }
    },
    deleteDeed: (state, action: PayloadAction<number>) => {
      state.deeds = state.deeds.filter((deed) => deed.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoodDeeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoodDeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deeds = action.payload;
      })
      .addCase(fetchGoodDeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch good deeds';
      });
  },
});

export const { setDeeds, addDeed, updateDeed, deleteDeed } =
  goodDeedsSlice.actions;
export default goodDeedsSlice.reducer;
