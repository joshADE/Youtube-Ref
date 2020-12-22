import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import videoReducer from '../features/video/videoSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    video: videoReducer
  },
});
