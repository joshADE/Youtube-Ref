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
import withNavigator from './withNavigator';

function CreateReference({
    // from withNavigator HOC
    currentComponent,
    goToNextComponent,
    goToPrevComponent,
    // other props
}) {
    const dispatch = useDispatch();
    
    const addVideo = () => {
        dispatch(add({id: uuidv4(), ...videoReference}));
        goToNextComponent();
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
                    video={videoReference}
                    setNewReference={setNewReference}
                    handleVideoEnd={() => {console.log('video ended')}}
                    nextButtonText="Create"
                    nextButtonHandler={goToNextComponent}
                />
                <VideoPlayer 
                    video={videoReference}
                    nextButtonText="Add Video Reference"
                    nextButtonHandler={addVideo}
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

export default withNavigator(CreateReference, 4);
