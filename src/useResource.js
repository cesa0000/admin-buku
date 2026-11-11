import { useCallback, useEffect, useState } from 'react';

export function useResource(store) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    store
      .getAll()
      .then((data) => active && setItems(data))
      .catch(() => active && setError('Data gagal dimuat. Muat ulang halaman.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [store]);

  const create = useCallback(
    async (data) => {
      const item = await store.create(data);
      setItems((prev) => [item, ...prev]);
      return item;
    },
    [store]
  );

  return { items, loading, error, create };
}

// Warna punggung buku yang konsisten untuk setiap nama.
export function spineColor(text) {
  let h = 0;
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 45% 42%)`;
}
