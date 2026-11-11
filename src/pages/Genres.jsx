import { useMemo, useState } from 'react';
import { genreStore } from '../api';
import { spineColor, useResource } from '../useResource';

const empty = { name: '', description: '' };

export default function Genres() {
  const { items, loading, error, create } = useResource(genreStore);
  const [form, setForm] = useState(empty);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState('');

  const shown = useMemo(
    () => items.filter((g) => g.name.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setNotice('');
    if (!form.name.trim()) return setFormError('Nama genre wajib diisi.');
    setSaving(true);
    setFormError('');
    try {
      const g = await create({ name: form.name.trim(), description: form.description.trim() });
      setForm(empty);
      setNotice(`Genre "${g.name}" ditambahkan.`);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <header className="head">
        <h2>Genre</h2>
        <p>{loading ? 'Memuat…' : `${items.length} genre terdaftar`}</p>
      </header>
      <div className="split">
        <section aria-label="Daftar genre">
          <input
            className="search"
            type="search"
            placeholder="Cari genre"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Cari genre"
          />
          {error && <p className="msg err" role="alert">{error}</p>}
          {loading && <p className="muted">Memuat daftar genre…</p>}
          {!loading && shown.length === 0 && (
            <p className="muted">
              {q ? `Tidak ada genre dengan kata "${q}".` : 'Belum ada genre. Tambahkan lewat formulir.'}
            </p>
          )}
          <ul className="shelf">
            {shown.map((g) => (
              <li key={g.id} style={{ '--spine': spineColor(g.name) }}>
                <strong>{g.name}</strong>
                <span>{g.description || 'Tanpa deskripsi'}</span>
              </li>
            ))}
          </ul>
        </section>

        <form className="panel" onSubmit={submit} noValidate>
          <h3>Tambah genre</h3>
          <label>
            Nama genre
            <input value={form.name} onChange={set('name')} placeholder="Contoh: Misteri" />
          </label>
          <label>
            Deskripsi
            <textarea rows="3" value={form.description} onChange={set('description')} />
          </label>
          {formError && <p className="msg err" role="alert">{formError}</p>}
          {notice && <p className="msg ok" role="status">{notice}</p>}
          <button type="submit" disabled={saving}>{saving ? 'Menyimpan…' : 'Simpan genre'}</button>
        </form>
      </div>
    </>
  );
}
