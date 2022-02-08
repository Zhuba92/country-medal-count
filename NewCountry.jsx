import React from 'react';
import { Button } from '@mui/material';

const NewCountry = (props) => {

  const {onAdd} = props;

  const handleNameCheck = () => {
    const name = prompt('Please enter country name');
    if (name.trim().length > 0) {
      onAdd(name);
    }
  }

  return (
    <div>
      <Button style={{width: '10em', height: '3em', fontFamily: 'Lobster, cursive', backgroundColor: 'yellow', color: 'black', fontSize: 'large'}} 
        onClick={ handleNameCheck }>Add Country</Button>
    </div>
  );
}

export default NewCountry;