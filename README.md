# Admin Perpustakaan (Tugas React JS Lanjutan #1)

Fitur **read** dan **create** untuk **Genre** dan **Penulis (Author)** pada tampilan Admin.

## Menjalankan
```bash
npm install
npm run dev
```
Buka http://localhost:5173 (rute: `/admin/genres` dan `/admin/authors`).

## Catatan
- Data disimpan di localStorage lewat `src/api.js`. Untuk memakai backend, ganti `getAll()` dan `create()` dengan fetch/axios.
- Validasi: nama wajib diisi, nama tidak boleh duplikat, tahun lahir harus wajar.

## Upload ke GitHub (private)
```bash
git init
git add .
git commit -m "Tugas 1: read & create genre dan author"
git branch -M main
git remote add origin https://github.com/USERNAME/admin-buku.git
git push -u origin main
```
Lalu di GitHub: Settings > Collaborators > Add people > masukkan username mentor.
