import { createSlice } from '@reduxjs/toolkit';


export const videoSlice = createSlice({
    name: 'video',
    initialState: {
      videos: [],
    },
    reducers: {
      add: (state, action) => {
        state.videos.push(action.payload);
      },
      removeAtIndex: (state, action) => {
        state.videos.splice(action.payload, 1);
      },
      editAtIndex: (state, action) => {
        state.videos.splice(action.payload.index, 1, action.payload.video)
      }
    },
  });


  export const { add, removeAtIndex, editAtIndex } = videoSlice.actions;

  export const selectVideos = state => state.video.videos;

  export default videoSlice.reducer;