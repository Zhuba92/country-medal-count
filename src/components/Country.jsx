import React from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Medal from './Medal';
import { Button } from '@mui/material';

const Country = (props) => {

  const {country, medals, handleIncrement, handleDecrement, handleDelete} = props;

  return (
    <Card variant="outlined" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', alignItems: 'center', width: '25%', backgroundColor: 'rgb(176, 225, 240)', borderWidth: '.5rem', borderColor: 'yellow'}}> 
        <div className='Name' style={{justifyContent: 'center', alignItems: 'center'}}>
            <h1>{ country.name } Total Medals: {country.gold + country.silver + country.bronze}</h1><Divider style={{ background: 'yellow', height: '.5em' }} variant="middle" />
        </div>
        {medals.map(medal =>
          <Medal
            key = {medal.id}
            country = {country}
            medal = {medal}
            handleIncrement = {handleIncrement}
            handleDecrement = {handleDecrement}
          />
        )}
        <Button style={{width: '10em', marginBottom: '2em', fontFamily: 'Lobster, cursive', backgroundColor: 'red', color: 'black'}}  
          onClick={() => handleDelete(country.id)}>Delete</Button>
    </Card>
  );
}

export default Country