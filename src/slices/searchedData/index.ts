import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { InitialState, SearchedPost } from '@/slices/searchedData/type';
import { searchAllData, searchUserData } from '@/slices/searchedData/thunk';
import { name } from '@/slices/searchedData/constants';
import { initialSearchedPost, initialUser } from '@/slices/initialState';
import { User } from '@/types/APIResponseTypes';

const initialState: InitialState = {
  postData: [initialSearchedPost],
  userData: [initialUser],
  status: 'idle',
};

const searchedDataSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      searchAllData.fulfilled,
      (state, action: PayloadAction<SearchedPost[]>) => {
        state.postData = action.payload;
      },
    );
    builder.addCase(
      searchUserData.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.userData = action.payload;
      },
    );

    builder.addMatcher(
      isAnyOf(searchAllData.pending, searchUserData.pending),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        searchAllData.fulfilled,
        searchUserData.fulfilled,
        searchAllData.rejected,
        searchUserData.rejected,
      ),
      (state) => {
        state.status = 'idle';
      },
    );
  },
});

export default searchedDataSlice.reducer;
