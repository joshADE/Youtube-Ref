import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { 
    deleteCollectionAsync
} from '../features/collection/collectionSlice';
import { getColorAsString } from '../utility';
import ErrorNotice from './misc/ErrorNotice';
import ToggleableColorPicker from './misc/ToggleableColorPicker';

function CollectionDetail({
    collection,
    collections,
    isNewCollection,
    handleSubmitCollectionDetail
}) {
    const dispatch = useDispatch();
    const [newCollectionDetails, setNewCollectionDetails] = useState({
        name: collection.name,
        color: collection.color
    });
    const [error, setError] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(collections.filter(col => col.name !== collection.name).find(col => col.name === newCollectionDetails.name)){
            setError('New collection name must be unique');
            return;
        }
        if(isNewCollection){
            handleSubmitCollectionDetail(newCollectionDetails);
        }else{
            handleSubmitCollectionDetail(collection.id, newCollectionDetails);
        }
    }
    const handleColorChange = (newColorAsString) => {
        setNewCollectionDetails({
            ...newCollectionDetails,
            color: newColorAsString
        });
    }
    const handleNameChange = (newName) => {
        setNewCollectionDetails({
            ...newCollectionDetails,
            name: newName
        });
    }

    return (
        <div
            className="collection-detail"
        >
            <Form
                className="new-collection-form"
                onSubmit={handleSubmit}
            >
                <FormGroup>
                    <Label for="nameInput">Name: </Label>
                    {!isNewCollection && <div>{collection.name}</div>}
                    <Input 
                        type="text" 
                        name="name" 
                        id="nameInput" 
                        value={newCollectionDetails.name} 
                        onChange={(e) => handleNameChange(e.target.value)} 
                        required
                    />
                    {error && 
                    <ErrorNotice 
                        message={error}
                        clearError={() => setError(undefined)}
                    />}
                </FormGroup>
                <FormGroup>
                    <Label for="colorInput">Color</Label>
                    {' '}
                    {!isNewCollection && <div className="color-display" style={{backgroundColor: getColorAsString(JSON.parse(collection.color))}}></div>}
                    <ToggleableColorPicker
                        defaultColor={newCollectionDetails.color}
                        handleColorChange={handleColorChange}
                    />
                </FormGroup>
                {isNewCollection 
                ? <Button>Add</Button>
                : <><Button>Change</Button>
                {' '}
                <Button onClick={() => dispatch(deleteCollectionAsync(collection.id))}>Delete</Button></>}
            </Form>
        </div>
    )
}

export default CollectionDetail
