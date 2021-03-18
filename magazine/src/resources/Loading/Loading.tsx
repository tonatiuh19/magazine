import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <FontAwesomeIcon icon={faHatWizard} pulse />
        </div>
    )
}

export default Loading
