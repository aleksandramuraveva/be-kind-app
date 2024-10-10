import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoodDeed {
  id: number;
  content: string;
}

interface GoodDeedsState {
  deeds: GoodDeed[];
}

const initialState: GoodDeedsState = {
  deeds: [],
};

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
      const index = state.deeds.findIndex(deed => deed.id === action.payload.id);
      if (index !== -1) {
        state.deeds[index] = action.payload;
      }
    },
    deleteDeed: (state, action: PayloadAction<number>) => {
      state.deeds = state.deeds.filter(deed => deed.id !== action.payload);
    },
  },
});

export const { setDeeds, addDeed, updateDeed, deleteDeed } = goodDeedsSlice.actions;
export default goodDeedsSlice.reducer;
