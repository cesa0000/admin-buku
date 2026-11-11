import { useMemo, useState } from 'react';
import { authorStore } from '../api';
import { spineColor, useResource } from '../useResource';

const empty = { name: '', country: '', birthYear: '', bio: '' };

export default function Authors() {
  const { items, loading, error, create } = useResource(authorStore);
  const [form, setForm] = useState(empty);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState('');

  const shown = useMemo(
    () => items.filter((a) => a.name.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setNotice('');
    const year = Number(form.birthYear);
    if (!form.name.trim()) return setFormError('Nama penulis wajib diisi.');
    if (!form.country.trim()) return setFormError('Negara asal wajib diisi.');
    if (form.birthYear && (!Number.isInteger(year) || year < 1000 || year > new Date().getFullYear()))
      return setFormError('Tahun lahir tidak valid.');
    setSaving(true);
    setFormError('');
    try {
      const a = await create({
        name: form.name.trim(),
        country: form.country.trim(),
        birthYear: form.birthYear ? year : null,
        bio: form.bio.trim(),
      });
      setForm(empty);
      setNotice(`Penulis "${a.name}" ditambahkan.`);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const initials = (n) => n.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <>
      <header className="head">
        <h2>Penulis</h2>
        <p>{loading ? 'Memuat…' : `${items.length} penulis terdaftar`}</p>
      </header>
      <div className="split">
        <section aria-label="Daftar penulis">
          <input
            className="search"
            type="search"
            placeholder="Cari penulis"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Cari penulis"
          />
          {error && <p className="msg err" role="alert">{error}</p>}
          {loading && <p className="muted">Memuat daftar penulis…</p>}
          {!loading && shown.length === 0 && (
            <p className="muted">
              {q ? `Tidak ada penulis dengan kata "${q}".` : 'Belum ada penulis. Tambahkan lewat formulir.'}
            </p>
          )}
          <ul className="shelf">
            {shown.map((a) => (
              <li key={a.id} style={{ '--spine': spineColor(a.name) }}>
                <span className="avatar" aria-hidden="true">{initials(a.name)}</span>
                <div>
                  <strong>{a.name}</strong>
                  <span>{a.country}{a.birthYear ? `, lahir ${a.birthYear}` : ''}</span>
                  {a.bio && <span>{a.bio}</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <form className="panel" onSubmit={submit} noValidate>
          <h3>Tambah penulis</h3>
          <label>
            Nama penulis
            <input value={form.name} onChange={set('name')} />
          </label>
          <label>
            Negara asal
            <input value={form.country} onChange={set('country')} />
          </label>
          <label>
            Tahun lahir (opsional)
            <input inputMode="numeric" value={form.birthYear} onChange={set('birthYear')} placeholder="1970" />
          </label>
          <label>
            Biografi singkat
            <textarea rows="3" value={form.bio} onChange={set('bio')} />
          </label>
          {formError && <p className="msg err" role="alert">{formError}</p>}
          {notice && <p className="msg ok" role="status">{notice}</p>}
          <button type="submit" disabled={saving}>{saving ? 'Menyimpan…' : 'Simpan penulis'}</button>
        </form>
      </div>
    </>
  );
}
