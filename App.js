import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () => {

  const [countries, setCountries] = useState([]);

  const medals = useRef([
    {id: 1, name: 'gold'},
    {id: 2, name: 'silver'},
    {id: 3, name: 'bronze'},
  ]);

  const renderMetals = () => {
    const goldMedals = countries.reduce((a, b) => a + b.gold, 0);
    const silverMedals = countries.reduce((a, b) => a + b.silver, 0);
    const bronzeMedals = countries.reduce((a, b) => a + b.bronze, 0);
    return goldMedals + silverMedals + bronzeMedals;
  }

  const handleAddCountry = (name) => {
    const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    setCountries([...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 }));
  }

  const handleDeleteCountry = (countryID) => {
    setCountries([...countries ].filter(c => c.id !== countryID));
  }

  const handleIncrement = (countryID, medalName) => {
    //this.setState({gold: this.state.gold + 1});
    const countryIndex = countries.findIndex(c => c.id === countryID);
    const countriesMutable = [...countries];
    countriesMutable[countryIndex][medalName] += 1;
    setCountries([...countries]);
  }

  const handleDecrement = (countryID, medalName) => {
    const countryIndex = countries.findIndex(c => c.id === countryID);
    const countriesMutable = [...countries];
    countriesMutable[countryIndex][medalName] -= 1;
    setCountries([...countries]);
  }

  useEffect(() => {
    let mutableCountries = [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 6 },
      { id: 2, name: 'China', gold: 3, silver: 5, bronze: 8 },
      { id: 3, name: 'Germany', gold: 0, silver: 4, bronze: 5 },
    ]
    setCountries(mutableCountries);
  }, [])


  return ( 
    <div className="App">
      <header className="App-header"></header>
      <h1>Total Medals: {renderMetals()}</h1>
      <NewCountry onAdd={ handleAddCountry }/>
        { countries.map(country => 
          <Country 
            key = { country.id } 
            country = { country }
            medals = {medals.current}
            handleIncrement = {handleIncrement}
            handleDecrement = {handleDecrement}
            handleDelete = {handleDeleteCountry} />
        )}
    </div>
    );
}

export default App;
