import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk pour login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      localStorage.setItem("token", data.body.token);
      return data.body.token;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour récupérer les infos utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.body;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;