import { useEffect, useState } from 'react';

// data
import { environment } from "../constants/environment-variables";

const API_URL = `${environment.backendUrl}/api/`;
//const API_URL = 'http://localhost:3000/api/';

export function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(API_URL + url, {
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not fetch data');
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
    isError
  };
}
