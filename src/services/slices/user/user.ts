import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, registerUser, fetchUser, updateUser } from './action';

interface UserState {
  user: {
    email: string;
    name: string;
    password?: string;
  } | null;
  isAuthChecked: boolean;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { setUser, setIsAuthChecked } = userSlice.actions;

export const getUser = (state: { user: UserState }) => state.user.user;
export const getIsAuthChecked = (state: { user: UserState }) => state.user.isAuthChecked;

export default userSlice.reducer;
