import React from 'react'
import { Button } from 'reactstrap';

function ComponentNavigator({
    currentComponent,
    allowNavigation,
    goToNextComponent,
    goToPrevComponent,
    children
}) {
    
    return (
        <div className="navigator">
            {children[currentComponent]}
            {allowNavigation && (
                <div style={{height: '10%'}} className="d-flex align-items-center justify-content-center">
                    <Button onClick={goToPrevComponent} outline color="secondary">Prev</Button>
                    <Button onClick={goToNextComponent} outline color="secondary">Next</Button>
                </div>
            )}
        </div>
    )
}

export default ComponentNavigator
