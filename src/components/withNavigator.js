import React, { useState } from 'react';

const withNavigator = (WrappedComponent, numberOfChildComponents) => {
    return function WithNavigator(props){
        const [currentComponent, setCurrentComponenet] = useState(0);
        const goToNextComponent = () => {
            if (currentComponent < numberOfChildComponents - 1)
                setCurrentComponenet(currentComponent + 1);
        }
        const goToPrevComponent = () => {
            if (currentComponent > 0)
                setCurrentComponenet(currentComponent - 1);
        }

        return (
            <WrappedComponent 
            {...props} 
            currentComponent={currentComponent}
            goToNextComponent={goToNextComponent}
            goToPrevComponent={goToPrevComponent}
            />
            )
    }
}


export default withNavigator;