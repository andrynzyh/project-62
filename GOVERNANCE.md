# Governance — Digimon MMORPG Wiki

Dokumen ini menjelaskan **bagaimana proyek dikelola** agar tetap terbuka untuk kontribusi siapa saja, tetapi **aman dari perubahan yang tidak diinginkan**. Model yang dipakai: **Pull Request + review** dengan `main` yang dilindungi.

## 🗺️ Alur Kontribusi

```text
Kontributor                 GitHub                        Maintainer
──────────                  ──────                        ─────────
Fork repo → branch baru
           │
           ├── Pull Request ──► CI otomatis (build + Zod)
           │                        │
           │                        ▼ (lolos? wajib)
           │                        ├── Review maintainer
           │                        │      │
           │                        ▼      ▼
           │                     Approve → Merge ke main
           │                                   │
           ▼                                   ▼
                                              Auto-deploy
                                              GitHub Pages
```

1. **Fork** — kontributor tidak punya akses langsung ke repo upstream.
2. **Branch** — setiap perubahan di branch terpisah (bukan main).
3. **Pull Request** — perjalanan menuju main. CI menjalankan `npm run build` (validasi Zod) di setiap PR.
4. **Review** — maintainer meninjau isi & keamanan. PR yang menyentuh area sensitif (lihat CODEOWNERS) butuh persetujuan pemilik.
5. **Merge** — hanya setelah CI hijau & review selesai.
6. **Deploy** — push ke `main` memicu deploy otomatis ke GitHub Pages.

## 🔒 Branch Protection (wajib diaktifkan di GitHub)

Agar model di atas benar-benar ditegakkan, aktifkan **branch protection** untuk `main`:

| Setting | Nilai | Fungsi |
| --- | --- | --- |
| Require a pull request before merging | ✅ | Tidak ada push langsung ke main |
| Require approvals | **1 approval** | Setiap PR perlu review maintainer |
| Dismiss stale pull request approvals | ✅ | Perubahan baru → perlu re-review |
| Require status checks | ✅ (`CI / build-and-validate`) | PR tidak bisa merge jika build gagal |
| Require conversation resolution | ✅ | Komentar harus dijawab dulu |
| Require signed commits | Opsional | Verifikasi identitas penulis |
| Do not allow bypassing | ✅ | Bahkan admin tidak bisa melewati aturan |
| Restrict deletions | ✅ | Cabang `main` tidak bisa dihapus |
| Lock branch | ❌ (jangan) | Biarkan tetap terbuka untuk PR |

> ⚠️ **CATATAN**: Branch protection **hanya bisa diaktifkan dari web GitHub** (Settings → Branches → Add rule) atau via API. File ini adalah spesifikasi yang harus diikuti — bukan otomatis terpasang oleh git push.

## 🧪 CI — Gerbang Otomatis

Workflow `.github/workflows/ci.yml` berjalan di **setiap PR** dan **push ke main**:

- `npm ci` — install dependency deterministik (lockfile)
- `npm run build` — **validasi Zod semua frontmatter** + remark plugins + base links. Build gagal = PR ditolak otomatis oleh status check.

Workflow `.github/workflows/deploy.yml` hanya berjalan saat push ke `main`, memakai environment `github-pages` terproteksi dengan `GITHUB_TOKEN` (tanpa secrets tambahan).

## 👥 Code Owners

File `.github/CODEOWNERS` menetapkan siapa yang wajib menyetujui perubahan pada area sensitif:

- `src/content.config.ts` (schema Zod) — perubahan di sini bisa merusak build **semua** konten
- `astro.config.mjs`, `package.json`, `tsconfig.json` — fondasi build
- `.github/workflows/` — alur CI/CD
- Lisensi & dokumen governance

Area konten (`src/content/**`) tidak diproteksi khusus di CODEOWNERS supaya kontribusi artikel tetap lancar — review tetap dilakukan manusia.

## � Setup Awal (sekali saja, oleh pemilik)

1. **Inisialisasi git** & buat repo GitHub:

   ```bash
   git init
   git add .
   git commit -m "chore: inisialisasi project-62"
   git branch -M main
   git remote add origin https://github.com/<owner>/62.git
   git push -u origin main
   ```

2. **Aktifkan branch protection** di GitHub: Settings → Branches → Add rule untuk `main` sesuai tabel di atas.
3. **Aktifkan GitHub Pages**: Settings → Pages → Source: **GitHub Actions** (bukan branch!). Deploy workflow sudah siap.
4. **Isi placeholder** di `SECURITY.md` & `CODE_OF_CONDUCT.md` (email kontak) dan `CODEOWNERS` (`@owner` → username Anda).
5. Pastikan workflow `CI` hijau di PR pertama.

## �🚫 Aturan yang Tidak Dapat Ditawar

| Aturan | Alasan |
| --- | --- |
| Tidak ada push langsung ke `main` | Semua perubahan lewat review |
| Tidak menambah dependency tanpa persetujuan | Menjaga permukaan serangan & lockfile stabil |
| Tidak mengubah `content.config.ts` tanpa diskusi | Bisa merusak build seluruh koleksi |
| Tidak ada file `.env*` di repo | Mencegah kebocoran secrets |
| Tidak ada file uji/placeholder dalam PR | Menjaga kualitas konten |

## 👤 Peran

| Peran | Tanggung Jawab |
| --- | --- |
| **Maintainer (pemilik)** | Review & merge PR, setup protection, kelola CI/CD, keputusan akhir |
| **Kontributor** | Menulis konten & perbaikan, mengikuti CONTRIBUTING.md |
| **Reviewer (undangan)** | Membantu review konten area tertentu |

## 📜 Lisensi

- Konten (`src/content/`): **CC BY 4.0** — silakan berbagi dengan atribusi
- Kode: **MIT** — bebas digunakan

## ❓ FAQ

**Q: Bisakah saya berkontribusi tanpa fork?**
A: Perlu — fork adalah bagian dari model keamanan. Kontributor yang dipercaya bisa diundang menjadi collaborator dengan akses branch, tapi tetap PR + review.

**Q: Bagaimana jika PR saya build error?**
A: CI akan menandai status check merah dan PR tidak bisa merge. Perbaiki frontmatter (baca `src/content.config.ts`) lalu push lagi — CI otomatis jalan ulang.

**Q: Siapa yang bisa mengubah isi konten yang sudah ada?**
A: Siapa saja via PR. Perubahan besar/sensasional sebaiknya dibahas di issue dulu.

**Q: Apa yang terjadi jika ada spam/PR merusak?**
A: Branch protection + review manusia + CODEOWNERS menahannya. Maintainer bisa menutup PR, menghapus cabang fork, dan memblokir pengguna bila perlu.
