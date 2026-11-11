// Lapisan data. Saat ini memakai localStorage agar bisa dijalankan tanpa backend.
// Jika sudah punya REST API, cukup ganti isi getAll() dan create() dengan fetch/axios,
// misalnya: fetch(`${import.meta.env.VITE_API_URL}/genres`). Komponen tidak perlu diubah.

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

function makeStore(key, seed, uniqueField) {
  const read = () => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch { /* abaikan data rusak */ }
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  };
  return {
    async getAll() {
      await delay();
      return read();
    },
    async create(data) {
      await delay();
      const list = read();
      const dup = list.some(
        (i) => i[uniqueField].toLowerCase() === data[uniqueField].toLowerCase()
      );
      if (dup) throw new Error(`"${data[uniqueField]}" sudah ada di daftar.`);
      const item = { id: Date.now(), ...data };
      localStorage.setItem(key, JSON.stringify([item, ...list]));
      return item;
    },
  };
}

export const genreStore = makeStore(
  'genres',
  [
    { id: 1, name: 'Fiksi', description: 'Novel dan cerita rekaan.' },
    { id: 2, name: 'Sejarah', description: 'Peristiwa dan tokoh dari masa lalu.' },
    { id: 3, name: 'Sains', description: 'Ilmu pengetahuan populer dan akademik.' },
    { id: 4, name: 'Fantasi', description: 'Dunia imajinatif dengan unsur magis.' },
  ],
  'name'
);

export const authorStore = makeStore(
  'authors',
  [
    { id: 1, name: 'Pramoedya Ananta Toer', country: 'Indonesia', birthYear: 1925, bio: 'Penulis Tetralogi Buru.' },
    { id: 2, name: 'Andrea Hirata', country: 'Indonesia', birthYear: 1967, bio: 'Penulis novel Laskar Pelangi.' },
    { id: 3, name: 'Dee Lestari', country: 'Indonesia', birthYear: 1976, bio: 'Penulis seri Supernova.' },
    { id: 4, name: 'Eka Kurniawan', country: 'Indonesia', birthYear: 1975, bio: 'Penulis Cantik Itu Luka.' },
  ],
  'name'
);
