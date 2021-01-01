import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComponentNavigator from './ComponentNavigator';
import VideoReferencer from './VideoReferencer';
import withNavigator from './withNavigator';
import { selectVideos, editVideoAsync } from '../features/video/videoSlice';


function EditReference({
    // from withNavigator HOC
    currentComponent,
    goToNextComponent,
    goToPrevComponent,
    // other props
}) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videos = useSelector(selectVideos);
    const videoIndex = videos.findIndex(vid => vid.id === id);
    

    if (videoIndex === -1){
        return (
            <div className="text-center">
                <h3>404 - Video Reference Not Found</h3>
            </div>
        )
    }

    const video = videos[videoIndex];

    const setNewReference = (newName, newStartSeconds, newEndSeconds = null) => {
        dispatch(editVideoAsync(id,{
            ...video,
            name: newName,
            startSeconds: newStartSeconds,
            endSeconds: newEndSeconds
        }));
    }
    return (
        <div>
            <h2 className="text-center">Edit Reference for video {video.name}</h2>
            <ComponentNavigator
                currentComponent={currentComponent}
                goToNextComponent={goToNextComponent}
                goToPrevComponent={goToPrevComponent}
                allowNavigation={false}
            >
                <VideoReferencer 
                    video={video}
                    setNewReference={setNewReference}
                    handleVideoEnd={() => console.log('ended')}
                    nextButtonText="Make Changes"
                    nextButtonHandler={goToNextComponent}
                />
                <div className="text-center">
                    <h3>Video Reference Changed!</h3>
                    <h4>You can go back to home to see the changes</h4>
                </div>
            </ComponentNavigator>
        </div>
    )
}



export default withNavigator(EditReference, 2);
