import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';

const Medal = (props) => {
    
    const {medal, country, handleIncrement, handleDecrement} = props;
    
    return (
        <div className='count' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton disabled={country[medal.name] === 0 ? true : false} style={{color: "yellow", marginRight: '0px'}} className='Count' onClick={ () => handleDecrement(country.id, medal.name)}><RemoveCircleIcon fontSize="large"></RemoveCircleIcon></IconButton>
            <AddCircleIcon fontSize="large" style={{color: "yellow", marginRight: '10px'}} className='Count' onClick={ () => handleIncrement(country.id, medal.name)}>+</AddCircleIcon>
            <span><h2>{medal.name} Medals: { country[medal.name]}</h2></span>
        </div>
    );
}

export default Medal;