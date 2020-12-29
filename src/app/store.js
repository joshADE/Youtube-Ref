import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import counterReducer from '../features/counter/counterSlice';
import videoReducer from '../features/video/videoSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    video: videoReducer,
    user: userReducer
  },
});
