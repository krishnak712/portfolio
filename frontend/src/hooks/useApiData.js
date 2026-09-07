import { useEffect, useState } from 'react';

export function useApiData(loader, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    loader()
      .then((value) => { if (active) setData(value); })
      .catch((err) => { if (active) setError(err?.message || 'Unable to load data.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [loader]);

  return { data, loading, error };
}
