import React, { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';

import { 
    selectCollectionData, 
    getAllUserCollectionsAsync,
    addCollectionAsync,
    editCollectionAsync
} from '../features/collection/collectionSlice';
import CollectionDetail from './CollectionDetail';

function ManageCollections() {
    const { isLoading, collections } = useSelector(selectCollectionData);
    const dispatch = useDispatch();
    const [newCollection, setNewCollection] = useState({
        name: '',
        color: JSON.stringify({r: '200', g: '200', b: '200', a: '1'})
    });
    const handleSubmitNewCollection = (newCollectionDetails) => {
        dispatch(addCollectionAsync(newCollectionDetails));
    }
    const handleSubmitEditCollection = (collectionId, newCollectionDetails) => {
        dispatch(editCollectionAsync(collectionId, newCollectionDetails));
    }
    
    useEffect(() => {
        dispatch(getAllUserCollectionsAsync());
    }, [])

    return (
        <div>
            <h2 className="text-center">Manage Collections</h2>
            <h3>Add a new Collection</h3>
            <CollectionDetail 
                collection={newCollection}
                collections={collections}
                isNewCollection={true}
                handleSubmitCollectionDetail={handleSubmitNewCollection}
            />
            <h3>Existing Collections</h3>
            {collections.map(col => 
                <CollectionDetail 
                    key={col.id}
                    collection={col}
                    collections={collections}
                    isNewCollection={false}
                    handleSubmitCollectionDetail={handleSubmitEditCollection}
                />
            )}
            {isLoading && <Spinner color="secondary" />}
        </div>
    )
}

export default ManageCollections
