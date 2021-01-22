import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import ErrorNotice from './misc/ErrorNotice';

function VideoSearch({
    setNewURL,
    goToNextComponent
}) {

    const [url, setURL] = useState('');
    const [error, setError] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        let pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i;
        let result = pattern.test(url);
        if (!result){
            setError('The link provided wasn\'t a valid youtube link');
            return;
        }

        setNewURL(url);
        goToNextComponent();

    }
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center px-2"
        >
                <Label for="videoSearch">Enter the url of the video to begin</Label>
                <Input className="col-sm-5 my-2" type="text" name="videoSearch" id="videoSearch" value={url} onChange={e => setURL(e.target.value)} />
                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                <Button className="my-2" onClick={handleSubmit}>Search</Button>
        </div>
    )
}

export default VideoSearch
