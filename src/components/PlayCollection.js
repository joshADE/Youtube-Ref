import React, { useState } from 'react'
import * as IoIcons from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectVideos } from '../features/video/videoSlice';
import { selectCollectionData } from '../features/collection/collectionSlice';
import VideoPlayer from './VidoePlayer';

function PlayCollection() {
    let [ index, setIndex ] = useState(0);
    
    let { id } = useParams();
    
    const { collections } = useSelector(selectCollectionData);
    let videos = useSelector(selectVideos);
    if (id === 'null'){
        id = null;
    }
    const collectionIndex = collections.findIndex(col => col.id === id);
    

    if (collectionIndex === -1){
        return (
            <div className="text-center">
                <h3>404 - Collection Not Found</h3>
            </div>
        )
    }
    

    const collection = collections[collectionIndex];

    videos = collection.videos; //videos.filter(vid => vid.collectionId === collection.id);

    const goToNextVideo = () => {
        if (index < videos.length - 1)
            setIndex(index + 1)
    }

    const goToPrevVideo = () => {
        if (index > 0)
            setIndex(index - 1);
    }

    

    return (
        <div className="play-list">
            <h2 className="text-center">{collection.name}</h2>
            {videos.length > 0 && <VideoPlayer 
                key={videos[index].id}  // This line is needed or React will confused when switching between players for the videos
                video={videos[index]}
                handleVideoEnd={goToNextVideo}
                nextButtonText="Previous Video"
                nextButtonHandler={goToPrevVideo}
            />}
            <div className="play-list-control">
                <IoIcons.IoChevronBack onClick={goToPrevVideo} className={`${index === 0?'disabled':''}`}/>
                {videos.length > 0 ?
                <div className="video-play-list">
                    {videos
                    .map((vid, ind) => 
                        (ind === index - 1 || ind === index || ind === index + 1)
                        ?(<div key={vid.id} className={`vid ${ind === index? 'current':''}`}>
                            {vid.name}
                        </div>)
                        :null
                    )}
                </div> : <div>There are no videos in this collection</div>}
                <IoIcons.IoChevronForward onClick={goToNextVideo} className={`${index >= videos.length - 1?'disabled':''}`}/>
            </div>
        </div>
    )
}

export default PlayCollection
