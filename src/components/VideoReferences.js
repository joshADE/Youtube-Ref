import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import { getTime } from '../utility'
import {
    selectVideos,
    removeAtIndex
} from '../features/video/videoSlice'
function VideoReferences() {
    const videos = useSelector(selectVideos);
    const dispatch = useDispatch();
    return (
        <div className="text-center">
            <h2>Video References</h2>
            {videos.length > 0 &&
            <Table
                size="sm"
                striped
            >
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video, index) => 
                    <tr key={video.id}>
                        <td>{video.url}</td>
                        <td>{video.name}</td>
                        <td>{getTime(video.startSeconds)}</td>
                        <td>{video.endSeconds?getTime(video.endSeconds):"-:-"}</td>
                        <td>
                            <NavLink to={`/edit/${video.id}`}>Edit</NavLink> 
                            {' '} | {' '}
                            <a href="#" onClick={() => dispatch(removeAtIndex(index))}>Delete</a>
                        </td>
                    </tr>)}
                </tbody>
            </Table>}
            {videos.length === 0 && <span>There are no video references to display</span>}
        </div>
    )
}

export default VideoReferences
