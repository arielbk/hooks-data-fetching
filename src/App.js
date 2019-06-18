import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux'
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(url);

      setData(result.data);
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }}
      >
        <input
          type="text"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <button type="submit">Search</button>
      </form>
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
