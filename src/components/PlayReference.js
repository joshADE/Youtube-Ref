import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectVideos } from '../features/video/videoSlice';
import VideoPlayer from './VidoePlayer';



function PlayReference() {
    const { id } = useParams();
    const videos = useSelector(selectVideos);
    const videoIndex = videos.findIndex(vid => vid.id === id);
    const history = useHistory();
    

    if (videoIndex === -1){
        return (
            <div className="text-center">
                <h3>404 - Video Reference Not Found</h3>
            </div>
        )
    }
    const video = videos[videoIndex];

    return (
        <div>
            <h2 className="text-center">Playing video {video.name}</h2>
            <VideoPlayer 
                video={video}
                handleVideoEnd={() => console.log('video ended')}
                nextButtonText="Go Back"
                nextButtonHandler={() => history.goBack()}
            />
        </div>
    )
}

export default PlayReference
