import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("http://localhost:5000/oauth/profile", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await fetch("http://localhost:5000/oauth/logout", {
    method: "GET",
  });

  if (response.ok) {
    console.log("Logout failed", response);
  }

  // return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
