import { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming the data returned by the API is of a generic type T
function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    axios.get<T>(url)
      .then(response => setData(response.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
