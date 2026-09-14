# Security Policy — Digimon MMORPG Wiki

Proyek ini adalah wiki statis (SSG) — kontribusi konten tidak mengeksekusi kode di server, sehingga permukaan serangan relatif kecil. Namun, keamanan tetap prioritas.

## 🚨 Melaporkan Kerentanan

**JANGAN** membuat issue publik untuk kerentanan keamanan (secrets, injeksi, eksploit yang bisa merusak build/deploy). Sebagai gantinya:

1. Kirim laporan langsung ke maintainer (email / diskusi privat) — kontak: `<GANTI-DENGAN-EMAIL-ANDA>`
2. Sertakan detail: langkah reproduksi, dampak, dan saran perbaikan (jika ada)
3. Maintainer akan merespons secepatnya dan berkoordinasi tentang disclosure

## 🔒 Praktik Keamanan Proyek

| Area | Praktik |
| --- | --- |
| **Branch protection** | `main` dilindungi — tidak ada push langsung, wajib PR + review |
| **CI (GitHub Actions)** | Menjalankan `npm run build` di setiap PR — membangun ulang + validasi Zod |
| **Dependencies** | Dibatasi minimal (`astro`, `@astrojs/sitemap`, `remark-directive`, `unist-util-visit`); penambahan perlu persetujuan |
| **Secrets** | Tidak ada secrets di repo; `.env` di-ignore. **Jangan pernah commit file `.env*`** |
| **Review** | Semua PR di-review maintainer sebelum merge |
| **CODEOWNERS** | File sensitif (schema Zod, konfigurasi, workflow) butuh persetujuan pemilik |

## ⚠️ Untuk Kontributor

- Jangan commit **secrets/token** apa pun — GitHub Actions tidak butuh token tambahan (deploy memakai `GITHUB_TOKEN` otomatis).
- Jangan commit **file uji** atau konten placeholder yang tidak relevan.
- Jangan mengubah **`src/content.config.ts`**, `astro.config.mjs`, atau workflow tanpa diskusi — perubahan bisa merusak build semua konten atau alur deploy.

## 📦 Dependensi Rentan

Maintainer bertanggung jawab memantau dependensi (`npm audit`) dan memperbarui bila ada kerentanan kritis. Kontributor yang menemukan kerentanan di dependency dipersilakan melapor di atas.
