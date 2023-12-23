import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

console.log("REACT_APP_API_ENDPOINT:", process.env.REACT_APP_API_ENDPOINT);

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

console.log("AUTH_ENDPOINT:", AUTH_ENDPOINT);

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "Cargando";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "Enviado";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "Falló";
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, (state, action) => {
        state.status = "Cargando";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "Enviado";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "Falló";
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;

export default userSlice.reducer;
