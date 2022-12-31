import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async ()=>{
    const { request } = useHttp();
    return await request("http://localhost:3001/filters")
  }
)

const heroesSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
    // filtersFetched: (state, action) => {
    //   state.filtersLoadingStatus = 'idle';
    //   state.filters = action.payload;
    // },
    // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
    activeFilterChanged:  (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'},)
    .addCase(fetchFilters.fulfilled, (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },)
    .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'}, )
    .addDefaultCase(()=>{})
  }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;