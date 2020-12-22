import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ComponentNavigator from './ComponentNavigator'
import VideoReferencer from './VideoReferencer'
import VideoSearch from './VideoSearch'
import VideoPlayer from './VidoePlayer'
import {
    add
} from '../features/video/videoSlice'

function CreateReference() {
    const dispatch = useDispatch();
    const [currentComponent, setCurrentComponenet] = useState(0);
    const goToNextComponent = () => {
        if (currentComponent < 3)
            setCurrentComponenet(currentComponent + 1);
    }
    const goToPrevComponent = () => {
        if (currentComponent > 0)
            setCurrentComponenet(currentComponent - 1);
    }

    const addVideo = () => {
        dispatch(add({id: uuidv4(), ...videoReference}));
        setCurrentComponenet(currentComponent + 1);
    }
    const [videoReference, setVideoReference] = useState({
        url: '',
        name: '',
        startSeconds: 0,
        endSeconds: null
      });
    
      const setNewURL = newURL => {
        setVideoReference({
          ...videoReference,
          url: newURL
        });
      }
    
      const setNewReference = (newName, newStartSeconds, newEndSeconds = null) => {
        setVideoReference({
          ...videoReference,
          name: newName,
          startSeconds: newStartSeconds,
          endSeconds: newEndSeconds
        });
      }
    return (
        <div>
            <h2 className="text-center">Create Reference</h2>
            <ComponentNavigator
                currentComponent={currentComponent}
                allowNavigation={false}
                goToNextComponent={goToNextComponent}
                goToPrevComponent={goToPrevComponent}
            >
                <VideoSearch
                    setNewURL={setNewURL}
                    goToNextComponent={goToNextComponent}
                />
                <VideoReferencer 
                    videoURL={videoReference.url}
                    setNewReference={setNewReference}
                    goToNextComponent={goToNextComponent}
                    handleVideoEnd={() => {console.log('video ended')}}
                />
                <VideoPlayer 
                    videoURL={videoReference.url}
                    startSeconds={videoReference.startSeconds}
                    endSeconds={videoReference.endSeconds}
                    goToNextComponent={addVideo}
                    handleVideoEnd={() => {console.log('video ended')}}
                />
                <div className="text-center">
                    <h3>Video Reference Added!</h3>
                    <h4>You can go back to home to see the new video</h4>
                </div>
            </ComponentNavigator>
        </div>
    )
}

export default CreateReference
