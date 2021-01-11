import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';


import {

    selectVideoData,
    getAllUserVideosAsync,

} from '../features/video/videoSlice'
import CollectionGrouping from './CollectionGrouping';
import { 
    selectCollectionData, 
    getAllUserCollectionsFullAsync,
    moveVideoAsync,
    
} from '../features/collection/collectionSlice';
function VideoReferences() {
    const { isLoading: isVideoLoading, videos } = useSelector(selectVideoData);
    const { isLoading: isCollectionLoading, collections } = useSelector(selectCollectionData);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllUserVideosAsync());
        dispatch(getAllUserCollectionsFullAsync());
    }, [])

    const handleDragEnd = (param) => {
        //console.log(param);
        const { source, destination, draggableId } = param;
        if (!destination){
            return;
        }
        let { droppableId: fromCollection, index: fromIndex } = source;
        let { droppableId: toCollection, index: toIndex } = destination;

        if (fromCollection === 'null'){
            fromCollection = null;
        } 
        if (toCollection === 'null'){
            toCollection = null;
        }
        let payload = {
            fromCollection,
            fromIndex,
            toCollection,
            toIndex
        }

        //console.log(fromCollection, toCollection, draggableId);

        dispatch(moveVideoAsync(draggableId, payload));

        // payload = {
        //     ...payload,
        //     videoId: draggableId
        // }
        // dispatch(moveVideo(payload));
        // dispatch(moveVideoInCollection(payload));
    }

    return (
        <div className="text-center">
            <h2>Video References</h2>
            <DragDropContext
                onDragEnd={handleDragEnd}
            >
            {collections.map(collection => (
                (collection.videos &&
                <CollectionGrouping 
                    key={collection.id}
                    collection={collection}
                    videos={collection.videos}
                    //videosConfirm={videos.filter(vid => vid.collectionId === collection.id)}
                />)
            ))}
            </DragDropContext>
            {(isCollectionLoading || isVideoLoading) && <Spinner color="secondary" />}
        </div>
    )
}

export default VideoReferences
