import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Genres from './pages/Genres';
import Authors from './pages/Authors';

export default function App() {
  return (
    <div className="shell">
      <aside className="side">
        <h1 className="brand">Admin<br />Perpustakaan</h1>
        <nav aria-label="Menu admin">
          <NavLink to="/admin/genres">Genre</NavLink>
          <NavLink to="/admin/authors">Penulis</NavLink>
        </nav>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/genres" replace />} />
          <Route path="/admin/genres" element={<Genres />} />
          <Route path="/admin/authors" element={<Authors />} />
          <Route path="*" element={<p>Halaman tidak ditemukan.</p>} />
        </Routes>
      </main>
    </div>
  );
}
