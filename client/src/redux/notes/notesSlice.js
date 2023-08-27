import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotesAsync = createAsyncThunk(
  "notes/getNotesAsync",
  async (text = "") => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/notes?text=${text}`
    );

    return res.data;
  }
);

export const addNoteAsync = createAsyncThunk(
  "notes/addNotesAsync",
  async (item) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/notes`,
      item
    );

    return res.data;
  }
);

export const updateNoteAsync = createAsyncThunk(
  "notes/updateNoteAsync",
  async (item) => {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_ENDPOINT}/notes`,
      item
    );

    return res.data;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    selectedItem: {
      id: "",
      title: "",
      body: "",
      color: "f94144",
    },
  },
  reducers: {
    selectNote: (state, action) => {
      const { id } = action.payload;

      const item = state.items.find((x) => x.id === id);
      state.selectedItem = item;
    },
  },
  extraReducers: {
    [getNotesAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [addNoteAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [updateNoteAsync.fulfilled]: (state, action) => {
      const { id } = action.payload;

      let itemIndex = state.items.findIndex((x) => x.id === id);
      state.items[itemIndex] = action.payload;

      state.selectedItem = { id: "", title: "", body: "", color: "f94144" };
    },
  },
});

export const { selectNote } = notesSlice.actions;

export default notesSlice.reducer;
