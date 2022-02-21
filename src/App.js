import React, {useState, useEffect, useRef} from 'react';
import NewCountry from './components/NewCountry';
import axios from 'axios';
import './App.css';
import Country from './components/Country';


const App = () => {

  const [countries, setCountries] = useState([]);
  const apiEndpoint = "https://olympic-medals-api-backend.azurewebsites.net/api/country"

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

  // const handleAddCountry = (name) => {
  //   const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
  //   setCountries([...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 }));
  // }

  const handleAddCountry = async (name) => {
    const { data: post } = await axios.post(apiEndpoint, { name: name });
    setCountries(countries.concat(post));
  }

  // const handleDeleteCountry = (countryID) => {
  //   setCountries([...countries ].filter(c => c.id !== countryID));
  // }

  const handleDeleteCountry = async (countryID) => {
    const originalCountries = countries;
    setCountries(countries.filter(c => c.id !== countryID));
    try {
      await axios.delete(`${apiEndpoint}/${countryID}`);
    } catch(ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while deleting a country');
        setCountries(originalCountries);
      }
    }
  }

  // const handleIncrement = (countryID, medalName) => {
  //   //this.setState({gold: this.state.gold + 1});
  //   const countryIndex = countries.findIndex(c => c.id === countryID);
  //   const countriesMutable = [...countries];
  //   countriesMutable[countryIndex][medalName] += 1;
  //   setCountries([...countries]);
  // }

  // const handleDecrement = (countryID, medalName) => {
  //   const countryIndex = countries.findIndex(c => c.id === countryID);
  //   const countriesMutable = [...countries];
  //   countriesMutable[countryIndex][medalName] -= 1;
  //   setCountries([...countries]);
  // }

  const handleIncrement = (countryId, medalName) => handleUpdate(countryId, medalName, 1);
  const handleDecrement = (countryId, medalName) =>  handleUpdate(countryId, medalName, -1)
  const handleUpdate = async (countryId, medalName, factor) => {
    const originalCountries = countries;
    const idx = countries.findIndex(c => c.id === countryId);
    const mutableCountries = [...countries ];
    mutableCountries[idx][medalName] += (1 * factor);
    setCountries(mutableCountries);
    const jsonPatch = [{ op: "replace", path: medalName, value: mutableCountries[idx][medalName] }];
    console.log(`json patch for id: ${countryId}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while updating');
        setCountries(originalCountries);
      }
    }
  }

  useEffect(() => {
    // let mutableCountries = [
    //   { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 6 },
    //   { id: 2, name: 'China', gold: 3, silver: 5, bronze: 8 },
    //   { id: 3, name: 'Germany', gold: 0, silver: 4, bronze: 5 },
    // ]
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
    }
    fetchData();
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
