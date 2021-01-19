import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { getTokenFromUserReducer } from '../user/userSlice';
import { getErrors } from '../error/errorSlice';
import { deleteVideoInCollection } from '../collection/collectionSlice';
export const videoSlice = createSlice({
    name: 'video',
    initialState: {
      videos: [],
      isLoading: false,
    },
    reducers: {
      add: (state, action) => {
        state.videos.push(action.payload);
      },
      replaceAllVideos: (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
      },
      removeVideo: (state, action) => {
        state.videos = state.videos.filter(vid => vid.id !== action.payload.id);
      },
      editVideo: (state, action) => {
        state.videos = state.videos.map(vid => {
          if (vid.id === action.payload.id)
            return action.payload;
          else
            return vid;
        });
      },
      startLoading: state => {
        state.isLoading = true;
      },
      stopLoading: state => {
        state.isLoading = false;
      },
      moveVideo: (state, { payload }) => {
        const { fromCollection, fromIndex, toCollection, toIndex, videoId } = payload;
        const indexInUnalteredState = state.videos.findIndex(video => video.id === videoId);
        if (indexInUnalteredState > -1){
          state.videos[indexInUnalteredState].collectionId = toCollection;
  
          const videosInToCollection = state.videos.filter(video => video.collectionId === toCollection);
          const videosNotInToCollection = state.videos.filter(video => video.collectionId !== toCollection);
          //newCourses[params.termI].splice(params.courseI, 0, newCourses[currentItem.termI].splice(currentItem.courseI, 1)[0]);
          const index = videosInToCollection.findIndex(video => video.id === videoId);

          videosInToCollection.splice(toIndex, 0, videosInToCollection.splice(index, 1)[0]);
          state.videos = [...videosInToCollection, ...videosNotInToCollection];
        }
      }
    },
  });


  export const { add, replaceAllVideos, removeVideo, editVideo, startLoading, stopLoading, moveVideo } = videoSlice.actions;

  const headers = (token) => ({
    headers: {"x-auth-token": token }
  })

  export const addVideoAsync = video => async (dispatch, getState) => {
      try{
          const savedVideo = await axios.post(
            '/videos/add',
            video,
            headers(getTokenFromUserReducer(getState))
          ); 
        dispatch(add(savedVideo.data));
      }catch (err) {
        console.log(err);
        if(err.response){
          dispatch(getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: null
          }));
        }
      }
  }

  export const getAllUserVideosAsync = () => async (dispatch, getState) => {
    try{
      dispatch(startLoading());
      const userVideos = await axios.get(
        '/videos/uservideos',
        headers(getTokenFromUserReducer(getState))
      ); 
      dispatch(replaceAllVideos(userVideos.data));
    }catch (err) {
      console.log(err);
      dispatch(stopLoading());
      if(err.response){
        dispatch(getErrors({
          msg: err.response.data,
          status: err.response.status,
          id: null
        }));
      }
    }
  }

  export const editVideoAsync = (videoId, editedVideo) => async (dispatch, getState) => {
    try{
      const updatedVideo = await axios.put(
        '/videos/edit/' + videoId,
        editedVideo,
        headers(getTokenFromUserReducer(getState))
      ); 
      dispatch(editVideo(updatedVideo.data));
    }catch (err) {
      console.log(err);
      if(err.response){
        dispatch(getErrors({
          msg: err.response.data,
          status: err.response.status,
          id: null
        }));
      }
    }
  }

export const deleteVideoAsync = (videoId) => async (dispatch, getState) => {
  try{
    const updatedVideo = await axios.delete(
      '/videos/delete/' + videoId,
      headers(getTokenFromUserReducer(getState))
    ); 
    dispatch(removeVideo(updatedVideo.data));
    dispatch(deleteVideoInCollection(updatedVideo.data));
  }catch (err) {
    console.log(err);
    if(err.response){
      dispatch(getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: null
      }));
    }
  }
}

  export const selectVideos = state => state.video.videos;
  export const selectVideoData = state => state.video;
  export default videoSlice.reducer;