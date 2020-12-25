import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

function VideoSearch({
    setNewURL,
    goToNextComponent
}) {

    const [url, setURL] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setNewURL(url);
        goToNextComponent();

    }
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center px-2"
        >
                <Label for="videoSearch">Enter the url of the video to begin</Label>
                <Input className="col-sm-5" type="text" name="videoSearch" id="videoSearch" value={url} onChange={e => setURL(e.target.value)} />
                <Button onClick={handleSubmit}>Search</Button>
        </div>
    )
}

export default VideoSearch
