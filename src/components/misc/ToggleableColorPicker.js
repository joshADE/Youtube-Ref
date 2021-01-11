import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { getColorAsString } from '../../utility';
function ToggleableColorPicker({
    handleColorChange,
    defaultColor
}) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const defCol = JSON.parse(defaultColor);
    const [color, setColor] = useState({
        r: defCol.r || '241',
        g: defCol.g || '112',
        b: defCol.b || '19',
        a: defCol.a || '1'
    })


    
    return (
        <div>
            <div style={swatchStyle} onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                <div style={{
                    ...colorStyle, 
                    background:  getColorAsString(color)
                }} />
            </div>
            { displayColorPicker ? <div style={popoverStyle}>
            <div style={coverStyle} onClick={() => setDisplayColorPicker(false)}/>
            <SketchPicker color={color} onChange={(col) => setColor(col.rgb)} onChangeComplete={(col) => handleColorChange(JSON.stringify(col.rgb))} />
            </div> : null }

        </div>
    )
}

const swatchStyle = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
}

const colorStyle = {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
}

const popoverStyle = {
    position: 'absolute',
    top: '30%',
    left: '30%',
    zIndex: '2',
}

const coverStyle = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px'
}

export default ToggleableColorPicker
