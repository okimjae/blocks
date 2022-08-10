import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { Node } from "../types/Node";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";

export interface NodesState {
  list: Node[];
}

export const getNodeBlocks = createAsyncThunk(
  "nodes/getNodeBlocks",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/blocks`);
    const {data} = await response.json();
    return data;
  }
);

export const getNodesBlocks = createAsyncThunk(
  "nodes/getNodesBlocks",
  async (nodes: Node[], thunkAPI) => {
    const { dispatch } = thunkAPI;
    nodes.forEach((node) => {
      dispatch(getNodeBlocks(node));
    });
  }
);

export const blocksSlice = createSlice({
  name: "blocks",
  initialState: initialState().nodes as NodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNodeBlocks.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) node.loading = true;
    });
    builder.addCase(getNodeBlocks.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.loading = false;
        node.blocks = action.payload;
      }
    });
    builder.addCase(getNodeBlocks.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.loading = false;
      }
    });
  },
});

export const selectBlocks = (state: RootState) => state.nodes.list;
export default blocksSlice.reducer;
