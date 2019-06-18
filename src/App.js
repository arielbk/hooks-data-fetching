import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      
      setIsLoading(false);
    }
    fetchData();
  }, [url]);
  
  return [{ data, isLoading, isError }, setUrl];
}

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );
  
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>There was an error :S</div>}

      {isLoading
        ? <div>Loading</div>
        : <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default App;
