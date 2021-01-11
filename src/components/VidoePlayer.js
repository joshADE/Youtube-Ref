import React, { useState, useEffect, useRef } from 'react'
import Slide from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CustomInput, Button } from 'reactstrap';
import ReactPlayer from 'react-player';
import { getTime } from '../utility';
import VolumeIndicator from './misc/VolumeIndicator';
const { createSliderWithTooltip } = Slide;
const Slider = createSliderWithTooltip(Slide);

function VideoPlayer({
    video,
    handleVideoEnd,
    nextButtonText,
    nextButtonHandler
}) {
    const [isPaused, setPaused ] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [repeat, setRepeat] = useState(false);
    const [value, setValue] = useState(video.startSeconds);
    const videoRef = useRef();

    const [videoDuration, setVideoDuration] = useState(60);

    useEffect(() => {
        if (videoRef.current){
            setVideoDuration(videoRef.current.getDuration());
        }
    })
    


    const handleVolumeChange = (newvolume) => {
        setVolume(newvolume);
        
    }
    const handlePlaying = (e) => { 
        setPaused(false);  
        
    }
    const handlePause = (e) => {
        setPaused(true);
        
    }
    const handleEnd = () => {
        if (repeat){
            if (videoRef.current){
                videoRef.current.seekTo(video.startSeconds);
                setValue(video.startSeconds);
            }
        }else{
            handleVideoEnd();
        }
    }

    const handleSliderChange = (newvalue) => {
        setValue(newvalue);
        if (videoRef.current){
            videoRef.current.seekTo(newvalue);
        }
    }

    const handleProgress = (state) => {
        setValue(state.playedSeconds);
    }

    return (
        <div className="player">
            <ReactPlayer
                className="video" 
                url={video.url}
                width="100%"
                height="100%"
                controls={false}
                playing={!isPaused}
                config={{
                    youtube: video.endSeconds
                    ? { playerVars: { start: video.startSeconds, end: video.endSeconds } } 
                    : { playerVars: { start: video.startSeconds } },
                }}
                onProgress={handleProgress}
                volume={volume}
                onPlay={handlePlaying}
                onPause={handlePause}
                onEnded={handleEnd}
                ref={videoRef}
            />
            <div
                className="track"
            >
            <span
                className=""
            >{getTime(value)}</span>
            
            <Slider 
                min={video.startSeconds}
                max={video.endSeconds?video.endSeconds:videoDuration}
                value={value}
                onChange={handleSliderChange}
                tipFormatter={val => getTime(val)}
            />
            </div>
            <div 
                className="controls"
            >
                <CustomInput 
                    type="switch" 
                    id="pauseSwitch" 
                    label="Pause" 
                    checked={isPaused}
                    onChange={() => setPaused(!isPaused)}
                />
                <CustomInput 
                    type="switch" 
                    id="repeatSwitch" 
                    label="Repeat after video ends" 
                    checked={repeat}
                    onChange={() => setRepeat(!repeat)}
                />
                <VolumeIndicator 
                    min={0}
                    max={1}
                    value={volume}
                />
                <Slider 
                    className="volumeSlider"
                    min={0}
                    max={1}
                    value={volume}
                    step={0.1}
                    onChange={handleVolumeChange}
                />
                <br />
                <Button onClick={nextButtonHandler} outline color="secondary">{nextButtonText}</Button>
            </div>
        </div>
    )
}

export default VideoPlayer
