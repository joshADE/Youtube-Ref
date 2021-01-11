import React from 'react'
import { Table } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { getColorAsString, getTime } from '../utility';
import { NavLink } from 'react-router-dom';
import {
    deleteVideoAsync
} from '../features/video/videoSlice'

function CollectionGrouping({
    collection,
    videos
}) {
    const dispatch = useDispatch();

    return (
        <Droppable
                droppableId={collection.id + ""}
        >
        {(provided, _) => (
            <div 
                className="collection-grouping"
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <div className="group-header" style={{color: getColorAsString(JSON.parse(collection.color)) }}>
                    <span className="group-title">{collection.name}</span>
                    {(collection.name === 'Uncategorized') && <span>*The order of videos isn't saved</span>}
                    <span className="group-actions">
                        <BsIcons.BsPlayFill />
                    </span>
                </div>
            
                <div 
                    className="group-body" 
                    style={{borderColor : getColorAsString(JSON.parse(collection.color)) }}
                >
                    <Table
                        size="sm"
                        striped
                    >
                        <thead>
                            <tr>
                                <th>Move</th>
                                <th>URL</th>
                                <th>Name</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody
                            
                        >
                        
                            {videos.map((video, index) => 
                            <Draggable 
                                key={video.id}
                                draggableId={video.id}
                                index={index}
                            >
                            {(provided, snapshot) => (
                                <tr 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    
                                    className="video-info"
                                >
                                    <td>
                                        <span
                                            {...provided.dragHandleProps}
                                        >
                                            <svg 
                                                className="octicon octicon-grabber" 
                                                viewBox="0 0 16 16" 
                                                version="1.1" 
                                                width="16" 
                                                height="16" 
                                                aria-hidden="true"
                                            >
                                                <path fillRule="evenodd" d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"></path>
                                            </svg>
                                        </span>
                                    </td>
                                    <td>{video.url}</td>
                                    <td>{video.name}</td>
                                    <td>{getTime(video.startSeconds)}</td>
                                    <td>{video.endSeconds?getTime(video.endSeconds):"-:-"}</td>
                                    <td>
                                        <NavLink className="video-action" to={`/play/${video.id}`}><BsIcons.BsPlayFill /></NavLink> 
                                        {' '} | {' '}
                                        <NavLink className="video-action" to={`/edit/${video.id}`}><BiIcons.BiEdit /></NavLink> 
                                        {' '} | {' '}
                                        <MdIcons.MdDelete className="video-action" onClick={() => dispatch(deleteVideoAsync(video.id))} />
                                    </td>
                                </tr>
                            )}
                            </Draggable>)}
                            {provided.placeholder}  
                            
                        </tbody>
                        
                    </Table>
                </div>
            
            </div>
            )}
        </Droppable>
    
    )
}

export default CollectionGrouping
