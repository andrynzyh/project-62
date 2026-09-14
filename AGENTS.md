# AGENTS.md — Digimon MMORPG Wiki (Astro)

Static wiki untuk game MMORPG Digimon: species digimon, evolution, items, dungeon, playstyle/progression guide. Dibangun dengan **Astro 5** + Content Collections (Zod).

> Bahasa komunikasi & penulisan konten: **Bahasa Indonesia**. Kode (frontmatter keys, kode) tetap bahasa Inggris.

## Commands

| Command | Keterangan |
| --- | --- |
| `npm run dev` | Dev server (Astro dev toolbar sengaja dimatikan) |
| `npm run build` | Build production — **wajib sukses**; sekaligus memvalidasi semua frontmatter Zod |
| `npm run preview` | Preview hasil build |

Tidak ada linter/typecheck/test script. Validasi utama = `npm run build` (Zod gagal → build error).

> ⚠️ **PENTING (exit code)**: `npm run build` harus exit 0 agar CI hijau. Jangan pernah memasang `process.on('exit')` di dalam plugin remark/pipeline Astro (lihat `src/lib/remark-base-links.mjs`) — itu membuat Astro keluar dengan code 1 walau build sukses. Hook debug BASELINK hanya aktif dengan env `DEBUG_BASELINK=1`.

## Status proyek & prioritas

Lihat [`TODO.md`](./TODO.md) untuk status item-by-item dan daftar prioritas selanjutnya (konten tipis, file uji, CI/CD, SEO).

## Model kontribusi (proyek terbuka!)

Proyek ini **terbuka untuk publik** — siapa pun boleh berkontribusi artikel/guide. Model yang dipakai **Pull Request + review** (branch `main` dilindungi):

- Semua perubahan masuk lewat **PR + review** — tidak ada push langsung ke `main`.
- **CI** (`.github/workflows/ci.yml`) menjalankan `npm run build` di setiap PR/push — ini gerbang otomatis (validasi Zod). PR wajib lolos sebelum merge.
- **Deploy** (`.github/workflows/deploy.yml`) otomatis ke GitHub Pages saat ada push ke `main`.
- **Area sensitif** (schema Zod, config, workflow, lisensi) dilindungi `.github/CODEOWNERS` — butuh persetujuan pemilik.
- Panduan untuk kontributor: [`CONTRIBUTING.md`](./CONTRIBUTING.md), model amannya: [`GOVERNANCE.md`](./GOVERNANCE.md).

## Struktur & arsitektur

- **`src/content.config.ts`** — sumber kebenaran schema Zod. 3 koleksi *explicit* ber-schema ketat: `digimon` (fields: stage, rank, attribute, role, partner), `accessories` (category, owner), `patchnote` (version, date, type Major/Hotfix).
- **Auto-collection** — SEMUA folder lain di `src/content/` otomatis jadi koleksi (schema generik: title, emoji, category, owner, description, tags, order). Menambah kategori baru = cukup buat folder, TANPA edit kode. Ini termasuk `dungeon/`, `guide/`, `items/`, `playstyle/`, `progression/`, `system/`.
- **Routing** — `src/pages/digimon/`, `accessories/`, `patchnote/` punya route khusus (diutamakan); koleksi auto-dirender lewat `src/pages/[collection]/` (`index.astro` + `[...slug].astro`).
- **Navigasi** — satu sumber kebenaran: `src/lib/navigation.ts` (`SIDEBAR_SECTIONS` untuk koleksi curated; auto-collection muncul sendiri).
- **Komponen existing** (jangan buat baru kalau sudah ada): `Header`, `Footer`, `EntryIcon` (render icon/gambar), `WikiCard`, `AccessoryCard`, `TamerList`, `NoviceChallenge`. Semua flat di `src/components/`; satu-satunya layout = `BaseLayout.astro` (SEO meta, OG tags, canonical sudah dibangun di sini).

## Base path `/62/` (penting!)

Deploy target: **GitHub Pages project site** (`site: https://digiedaw.github.io`, `base: /62` di `astro.config.mjs`).

- Semua link internal **wajib** lewat `withBase()` dari `src/lib/paths.ts` (idempotent; aman di dev & production).
- Link/embed markdown root-relative (`/digimon/x.png`) otomatis di-rewrite oleh `remarkBaseLinks` saat build — penulis konten cukup menulis path absolut.
- `src/lib/icons.ts` menyediakan `resolveIcon()`: lookup nama ikon dari `public/<collection>/` (case-insensitive, `_` ≡ `-`); `icon: "lucide:swords"` = nama ikon library, `icon: "digimon/Foo.png"` = path eksplisit.

## Konvensi konten (Markdown)

- Setiap file konten WAJIB punya frontmatter lengkap sesuai schema koleksinya (validasi Zod di build). Contoh digimon:

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

- **Admonition** tersedia via remark-directive: `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`, `:::success`, `:::important`, `:::caution` — judul opsional (`:::warning[Penting]`). Dipakai luas di konten guide.
- File `digimon` boleh disimpan dalam subfolder rank (`sss/`, `sssplus/`) — URL tetap bersih (`/digimon/<slug>/`) karena `generateId` memakai nama file saja.
- Tabel drops/stats ditulis markdown mentah di konten (komponen `ItemTable`/`StatTable` belum dibuat).

## Key files

| Path | Peran |
| --- | --- |
| `src/content.config.ts` | Schema Zod semua koleksi (wajib dicek sebelum edit frontmatter) |
| `astro.config.mjs` | Site config + remark plugins (admonitions, base links) |
| `src/lib/paths.ts` | `withBase()` — semua link internal |
| `src/lib/navigation.ts` | `SIDEBAR_SECTIONS`, auto-collection discovery |
| `src/lib/icons.ts` | `resolveIcon()` — lookup ikon `/public/<collection>/` |
| `src/styles/global.css` | CSS variables tema (dark: `--bg #070b16`, `--accent #29f19c`, `--accent-2 #37c8ff`); re-skin cukup ganti variabel |

## Aturan kerja

- **JANGAN** ubah file di `src/content/` tanpa konfirmasi — konten sering diedit manual.
- **JANGAN** install dependency baru tanpa persetujuan (saat ini hanya `astro`, `@astrojs/sitemap`, `remark-directive`, `unist-util-visit`; Node ≥ 20).
- **JANGAN** pakai Docusaurus/VitePress/framework lain tanpa diminta; jangan ubah struktur folder utama tanpa diskusi.
- **JANGAN** ubah `src/content.config.ts`, `astro.config.mjs`, atau `.github/workflows/` tanpa diskusi — area ini dilindungi CODEOWNERS.
- Gunakan TypeScript (bukan `any`), interface untuk shape / type untuk union; `strict` belum diaktifkan (masih `astro/tsconfigs/base`).
- Gambar: WebP preferred, simpan di `public/` (folder per koleksi: `public/digimon/`, `public/misc/`, `public/items/evo/`, dst).
- Styling: CSS variables + class BEM-ish (`.digimon-card__title`); jangan inline style kecuali untuk layout dinamis; indikator dark mode = `theme-color #070b16`.
- Search = custom client-side (`src/pages/search.astro`, index dibangun saat build dari SEMUA koleksi) — **bukan** Pagefind.
- Jangan commit `dist/`.
- Komponen/konten baru: ikuti pola file existing (`src/components/WikiCard.astro`, contoh entry di `src/content/digimon/zekegreymon.md`).
