import React from 'react'
import * as FiIcons from 'react-icons/fi';
function VolumeIndicator({
    value,
    min,
    max
}) {
    const midpoint = (max - min) / 2 + min;
    if (value === min)
        return <FiIcons.FiVolumeX className="volume-indicator"/>
    else if (value < midpoint)
        return <FiIcons.FiVolume1 className="volume-indicator"/>
    else if (value >= midpoint)
        return <FiIcons.FiVolume2 className="volume-indicator"/>
    else
        return <FiIcons.FiVolume className="volume-indicator"/>
}

export default VolumeIndicator
