# Contributing — Digimon MMORPG Wiki

Terima kasih sudah ingin berkontribusi! 🎉 Proyek ini terbuka untuk siapa saja — setiap artikel dan guide yang Anda tulis membantu komunitas.

> **Bahasa**: Seluruh komunikasi & konten memakai **Bahasa Indonesia**. Kode (frontmatter keys, file, variabel) tetap bahasa Inggris.

## 📋 Cara Berkontribusi

Model yang dipakai: **Pull Request + review** (branch `main` dilindungi).

```text
1. Fork repo → 2. Branch baru → 3. Commit → 4. Pull Request → 5. CI build → 6. Review & merge
```

### Langkah detail

1. **Fork** repository ini ke akun GitHub Anda.
2. **Clone** fork Anda dan buat branch baru:

   ```bash
   git clone https://github.com/<username>/project-62.git
   cd project-62
   git checkout -b feat/nama-artikel
   ```

3. **Buat artikel** di folder koleksi yang sesuai (lihat [Struktur Konten](#struktur-konten)).
4. **Jalankan build** untuk memastikan frontmatter lolos validasi Zod:

   ```bash
   npm install
   npm run build
   ```

5. **Commit** dengan pesan deskriptif:

   ```bash
   git add .
   git commit -m "feat(guide): tambah guide farm mid-game"
   git push origin feat/nama-artikel
   ```

6. **Buka pull request** dari branch Anda ke `main`. CI akan otomatis menjalankan build; PR harus lolos sebelum boleh di-review & merge.

## 🧭 Struktur Konten {#struktur-konten}

| Koleksi | Folder | Contoh |
| --- | --- | --- |
| Digimon | `src/content/digimon/` | `zekegreymon.md`, `sss/alphamon-ouryuken.md` |
| Accessories | `src/content/accessories/` | `Goggles.md`, `D-Ark.md` |
| Patchnote | `src/content/patchnote/` | `3-5-1.md` |
| Dungeon | `src/content/dungeon/` | `Late-Game/Marine-Dragon-Domain.md` |
| Guide | `src/content/guide/` | `new-player.md`, `class-guide.md` |
| Items | `src/content/items/` | `evolution-items.md` |
| Playstyle | `src/content/playstyle/` | `SK-Overview.md`, `TA-Gear-Progression.md` |
| Progression | `src/content/progression/` | `early-game.md` |
| System | `src/content/system/` | `Tamer.md`, `attribute.md` |

> 💡 Bukan kategori yang Anda cari? Folder baru di `src/content/` otomatis menjadi koleksi baru — tanpa perlu mengubah kode. Cukup buat folder + file markdown.

## 🧬 Frontmatter (wajib & di-validasi Zod)

Setiap file konten **WAJIB** punya frontmatter sesuai schema koleksinya (`src/content.config.ts` — sumber kebenaran).

**Contoh — koleksi strict `digimon`:**

```yaml
---
title: "Amphimon"
emoji: "🐧"
stage: "Ultimate"
rank: "SSS"
attribute: "Data"
role: "Skill"
description: "Ringkasan singkat untuk kartu & search."
tags: ["guide", "sss"]
order: 1
---
```

**Contoh — koleksi auto (generik), mis. `guide`:**

```yaml
---
title: "Panduan Farm Mid-Game"
emoji: "⚔️"
description: "Strategi farming material..."
tags: ["guide", "farm"]
order: 1
---
```

> ⚠️ **Catatan**: `title` dan `description` wajib di semua koleksi. Field lain menyesuaikan schema. Build error = frontmatter tidak valid.

## 📝 Konvensi Penulisan Konten

- **Admonition** tersedia: `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`, `:::success`, `:::important`, `:::caution` — judul opsional: `:::warning[Penting]`.
- **Link internal**: cukup tulis path absolut (`/digimon/x.png`) — otomatis di-rewrite dengan base path saat build.
- **Gambar**: WebP preferred, simpan di `public/` (folder per koleksi: `public/digimon/`, `public/misc/`, dst).
- **Tabel** drops/stats: tulis markdown mentah (komponen item/stat table belum tersedia).
- Digimon bisa disimpan dalam subfolder rank (`sss/`, `sssplus/`) — URL tetap bersih (`/digimon/<slug>/`).

## ✅ Definition of Done (sebelum PR)

- [ ] `npm run build` sukses tanpa error
- [ ] Frontmatter lengkap sesuai schema
- [ ] Artikel dalam Bahasa Indonesia
- [ ] Link internal valid
- [ ] Tidak ada file uji/placeholder (hapus file `test.md`, `basetest`, `testnet` jika ada)
- [ ] Tidak ada perubahan tidak relevan pada kode

## 🛡️ Yang Tidak Boleh Dilakukan

- ❌ Mengubah file di `src/content/` di luar tujuan artikel Anda tanpa konfirmasi
- ❌ Menambah dependency tanpa persetujuan maintainer
- ❌ Mengubah struktur folder utama tanpa diskusi
- ❌ Mengubah schema `src/content.config.ts` tanpa diskusi (bisa merusak build semua entri)
- ❌ Melewati review (push langsung ke `main` tidak mungkin — branch protection aktif)

## 🐛 Melaporkan Bug / 💡 Ide

- Buka **Issue** dengan template yang tersedia (Bug report / Feature request / Konten baru)
- Untuk pertanyaan kontribusi: tag maintainer di issue atau diskusi

Terima kasih sudah ikut membangun wiki komunitas ini! 💙
