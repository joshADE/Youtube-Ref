import React, { useState, useEffect, useRef } from 'react'
import Slide from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CustomInput, Form, FormGroup, Label, Button } from 'reactstrap';
import ReactPlayer from 'react-player';
import { getTime } from '../utility';
const { createSliderWithTooltip } = Slide;
const Slider = createSliderWithTooltip(Slide);

function VideoPlayer({
    videoURL,
    startSeconds,
    endSeconds,
    handleVideoEnd,
    goToNextComponent
}) {
    const [isPaused, setPaused ] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [repeat, setRepeat] = useState(false);
    const [value, setValue] = useState(startSeconds);
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
                videoRef.current.seekTo(startSeconds);
                setValue(startSeconds);
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
                url={videoURL}
                width="100%"
                height="100%"
                controls={false}
                playing={!isPaused}
                config={{
                    youtube: endSeconds
                    ? { playerVars: { start: startSeconds, end: endSeconds } } 
                    : { playerVars: { start: startSeconds } },
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
                min={startSeconds}
                max={endSeconds?endSeconds:videoDuration}
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
                <Slider 
                    className="volumeSlider"
                    min={0}
                    max={1}
                    value={volume}
                    step={0.1}
                    onChange={handleVolumeChange}
                />
                <Button onClick={goToNextComponent} outline color="secondary">Add</Button>
            </div>
        </div>
    )
}

export default VideoPlayer
