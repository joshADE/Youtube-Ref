import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CustomInput, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import ReactPlayer from 'react-player';
import { getTime, clamp } from '../utility'
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);




function VideoReferencer({
    videoURL,
    setNewReference,
    handleVideoEnd,
    goToNextComponent
}) {
    const [isPaused, setPaused ] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [repeat, setRepeat] = useState(false);
    const videoRef = useRef();
    const [referenceType, setReferenceType] = useState('point');
    const [referenceName, setReferenceName] = useState('');

    const [startPoint, setStartPoint] = useState(0);
    
    const [value, setValue] = useState(startPoint);
    const [videoDuration, setVideoDuration] = useState(60);
    const [endPoint, setEndPoint] = useState(20);

    const history = useHistory();

    useEffect(() => {
        if (videoRef.current){
            setVideoDuration(videoRef.current.getDuration());
            setEndPoint(clamp(endPoint, value, videoRef.current.getDuration()));
        }
    })
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (referenceType === 'point'){
            setNewReference(referenceName, Math.floor(startPoint));
        }else if (referenceType === 'range'){
            setNewReference(referenceName, Math.floor(startPoint), Math.floor(endPoint));
        }else{
            return;
        }
        goToNextComponent();
    }
   

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
                videoRef.current.seekTo(startPoint);
                setValue(startPoint);
            }
        }else{
            handleVideoEnd();
        }
    }

    const handleSliderChange = (newvalue) => {
        setStartPoint(newvalue[0]);
        setValue(newvalue[1]);
        if (newvalue[2]){
            setEndPoint(newvalue[2]);
        }
        console.log(newvalue)
        if (videoRef.current){
            videoRef.current.seekTo(newvalue[1]);
        }
        //setPaused(false);
    }

    const handleProgress = (state) => {
        setValue(state.playedSeconds);

        // the range input doesn't support overlapping of handles (so endpoint - 1)
        if (referenceType === 'range' && state.playedSeconds >= endPoint - 1){ 
            if (videoRef.current){
                setPaused(true);
            }
        }
    }

    const handleTypeChange = (e) => {
        setReferenceType(e.target.value);
        if (e.target.value === 'range'){
            setEndPoint(value + 5); // endPoint is clamped above
        }
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
            {' '} | {' '}
            <span
                className=""
            >{referenceName}</span>
            <Range
                min={0}
                max={videoDuration}
                value={(referenceType==='range')?[startPoint, value, endPoint]:[startPoint, value]}
                onChange={handleSliderChange}
                count={(referenceType==='range')?3:2}
                pushable={true}
                allowCross={true}
                tipFormatter={val => getTime(val)}
                handleStyle={[{}, {backgroundColor: 'paleturquoise'}]}
            
            />
            </div>
            <div 
                className="controls"
            >
                <Form
                    onSubmit={handleSubmit}
                >
                    <CustomInput 
                        type="switch" 
                        id="pauseSwitchReferencer"
                        label="Pause" 
                        checked={isPaused}
                        onChange={() => setPaused(!isPaused)}
                    />
                    <CustomInput 
                        type="switch"  
                        label="Repeat after video ends"
                        id="repeatSwitchReferencer" 
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
                    <FormGroup check>
                        <Label check>
                            <Input onChange={handleTypeChange} value="point" checked={referenceType === 'point'} type="radio" name="referenceType" />{' '}
                            Reference Point
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={handleTypeChange} value="range" checked={referenceType === 'range'} type="radio" name="referenceType" />{' '}
                            Reference Range
                        </Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="referenceName" sm={2}>Name</Label>
                        <Col sm={5}>
                            <Input type="text" name="referenceName" value={referenceName} onChange={(e) => setReferenceName(e.target.value)} id="referenceName" placeholder="Enter the reference name here" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 3, offset: 2 }}>
                        <Input type="submit" value="Submit"/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default VideoReferencer