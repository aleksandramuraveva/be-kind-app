import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Friend, FriendDeed } from '../types';

interface FriendsState {
  friends: Friend[];
  searchResults: Friend[];
  friendDeeds: FriendDeed[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FriendsState = {
  friends: [],
  searchResults: [],
  friendDeeds: [],
  status: 'idle',
  error: null,
};

export const searchFriends = createAsyncThunk(
  'friends/searchFriends',
  async (searchTerm: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/search?term=${searchTerm}`,
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

export const addFriend = createAsyncThunk(
  'friends/addFriend',
  async (friendUniqueTag: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/friends/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: Number(localStorage.getItem('userId')),
          friendUniqueTag,
        }),
      },
    );
    const data = await response.json();
    return data;
  },
);

export const deleteFriend = createAsyncThunk(
  'friends/deleteFriend',
  async (friendId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/friends/${friendId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error('Failed to delete friend');
    }
    return friendId;
  },
);

export const fetchFriendDeeds = createAsyncThunk(
  'friends/fetchFriendDeeds',
  async (friendId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/good-deeds/${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    const data = await response.json();
    return { friendId, deeds: data };
  },
);

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (userId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/friends/${userId}`,
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

// Slice
const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        searchFriends.fulfilled,
        (state, action: PayloadAction<Friend[]>) => {
          state.status = 'succeeded';
          state.searchResults = action.payload;
        },
      )
      .addCase(searchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search friends';
      })
      .addCase(addFriend.fulfilled, (state, action: PayloadAction<Friend>) => {
        state.friends.push(action.payload);
      })
      .addCase(
        deleteFriend.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.friends = state.friends.filter(
            (friend) => friend.userId !== action.payload,
          );
        },
      )
      .addCase(fetchFriendDeeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchFriendDeeds.fulfilled,
        (state, action: PayloadAction<FriendDeed>) => {
          state.status = 'succeeded';
          const index = state.friendDeeds.findIndex(
            (fd) => fd.friendId === action.payload.friendId,
          );
          if (index !== -1) {
            state.friendDeeds[index] = action.payload;
          } else {
            state.friendDeeds.push(action.payload);
          }
        },
      )
      .addCase(fetchFriendDeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch friend deeds';
      })
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchFriends.fulfilled,
        (state, action: PayloadAction<Friend[]>) => {
          // Handle fetching friends
          state.status = 'succeeded';
          state.friends = action.payload;
        },
      )
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch friends';
      });
  },
});

export const { clearSearchResults } = friendsSlice.actions;
export default friendsSlice.reducer;
