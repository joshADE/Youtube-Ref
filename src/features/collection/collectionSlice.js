import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { getTokenFromUserReducer } from '../user/userSlice';
import { getErrors } from '../error/errorSlice';
import { moveVideo } from '../video/videoSlice';
export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
      collections: [],
      isLoading: false
    },
    reducers: {
      add: (state, action) => {
        state.collections.push(action.payload);
      },
      replaceAllCollections: (state, action) => {
        state.collections = action.payload;
        state.isLoading = false;
      },
      removeCollection: (state, action) => {
        state.collections = state.collections.filter(col => col.id !== action.payload.id);
      },
      editCollection: (state, action) => {
        state.collections = state.collections.map(col => {
          if (col.id === action.payload.id)
            return action.payload;
          else
            return col;
        });
      },
      startLoading: state => {
        state.isLoading = true;
      },
      moveVideoInCollection: (state, { payload }) => {
        const { fromCollection, fromIndex, toCollection, toIndex, videoId } = payload;
        const fromColIndex = state.collections.findIndex(col => col.id === fromCollection);
        const vidIndex = state.collections[fromColIndex].videos.findIndex(vid => vid.id === videoId);
        state.collections[fromColIndex].videos[vidIndex].collectionId = toCollection;
        const toColIndex = state.collections.findIndex(col => col.id === toCollection);
        state.collections[toColIndex].videos.splice(
          toIndex, 
          0,
          state.collections[fromColIndex].videos.splice(vidIndex, 1)[0]
        );
      }
    },
  });


  export const { add, replaceAllCollections, removeCollection, editCollection, startLoading, moveVideoInCollection } = collectionSlice.actions;

  const headers = (token) => ({
    headers: {"x-auth-token": token }
  })

  export const addCollectionAsync = collection => async (dispatch, getState) => {
      try{
          const savedCollection = await axios.post(
            '/collections/add',
            collection,
            headers(getTokenFromUserReducer(getState))
          ); 
        dispatch(add(savedCollection.data));
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

  export const getAllUserCollectionsAsync = () => async (dispatch, getState) => {
    try{
      dispatch(startLoading());
      const userCollections = await axios.get(
        '/collections/usercollections',
        headers(getTokenFromUserReducer(getState))
      ); 
      dispatch(replaceAllCollections(userCollections.data));
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

  export const getAllUserCollectionsFullAsync = () => async (dispatch, getState) => {
    try{
      dispatch(startLoading());
      const userCollections = await axios.get(
        '/collections/usercollectionsfull',
        headers(getTokenFromUserReducer(getState))
      ); 
      dispatch(replaceAllCollections(userCollections.data));
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

  export const editCollectionAsync = (collectionId, editedCollection) => async (dispatch, getState) => {
    try{
      const updatedCollection = await axios.put(
        '/collections/edit/' + collectionId,
        editedCollection,
        headers(getTokenFromUserReducer(getState))
      ); 
      dispatch(editCollection(updatedCollection.data));
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

export const deleteCollectionAsync = (collectionId) => async (dispatch, getState) => {
  try{
    const updatedCollection = await axios.delete(
      '/collections/delete/' + collectionId,
      headers(getTokenFromUserReducer(getState))
    ); 
    dispatch(removeCollection(updatedCollection.data));
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

export const moveVideoAsync = (videoId, payload) => async (dispatch, getState) => {
    try{

      const updateResult = await axios.put(
        '/collections/move/' + videoId,
        payload,
        headers(getTokenFromUserReducer(getState))
      ); 
      payload = {...payload, videoId};
      dispatch(moveVideo(payload));
      dispatch(moveVideoInCollection(payload));
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

  export const selectCollectionData = state => state.collection;
  export default collectionSlice.reducer;