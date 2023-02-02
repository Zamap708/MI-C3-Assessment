import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  value: {
    users: [],
    status: 'idle',
    error: null,
    query: ""
  }
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (searchQuery, { rejectWithValue }) => {
    try {
      let pageIndex = 1;
      let BASE_URL = `https://swapi.dev/api/people/?search=${searchQuery}&page=${pageIndex}`;
      let result = await axios.get(BASE_URL);

      let results = [...result.data.results];

      while (result.data.next) {
        pageIndex++;
        BASE_URL = `https://swapi.dev/api/people/?search=${searchQuery}&page=${pageIndex}`;
        result = await axios.get(BASE_URL);
        results = [...results, ...result.data.results];
      }

      return results;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: initialStateValue,
  reducers: {
    search: (state, action) => {
      state.value.query = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const {search} = userSlice.actions
export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;
