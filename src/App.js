import './App.css';
import SearchBar from './components/SearchBar';
import ResultsPage from './components/ResultsPage';
import LoadingScreen from './components/LoadingScreen';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  //this useEffect allows us too filter the results of the query before fetching the data using SWAPI's search parameter
  //pagination is done by incrementing the page if result.data.next, a URL showing the next page, exists. fetchData will be called again because page is a dependency
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://swapi.dev/api/people/?search=${name}&page=${page}`);
      setData([...data, ...result.data.results]);

      if (result.data.next) {
        setPage(page + 1);
      } else {
        setLoading(false);
      }
    };

    fetchData();
    
  }, [name, page]);

  console.log(data)
  console.log(name)

  //able to pass this function down to the SearchBar and return the input value
  //setData is there to clear the data state before beginning the next search
 
  const handleChange = (value) => {
    setName(value)
    setData([])
    setLoading(true)
  }

  return (
    <div className="App">
      <SearchBar
        handleChange={handleChange}
      />
      {loading ? <LoadingScreen /> :
        <ResultsPage
          data={data}
        />}
    </div>
  );
}

export default App;
