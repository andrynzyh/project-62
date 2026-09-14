# 📝 TODO.md — Digimon MMORPG Wiki (Astro)

> **Status Legend:**  
>
> - [ ] = Belum dikerjakan  
> - [x] = Selesai  
> - [🔄] = Sedang dikerjakan  
> - [⏸️] = Ditunda (menunggu sesuatu)

---

## 1. 📦 Setup & Fondasi Proyek

- [x] Inisialisasi proyek Astro (Astro ^5.12, `package.json` = project-62)
- [ ] Setup TypeScript strict mode (saat ini `astro/tsconfigs/base`)
- [x] Tambahkan Content Collections (`src/content.config.ts` — konvensi Astro 5)
- [x] Setup CSS global & CSS variables (dark mode ready) — `src/styles/global.css`
- [x] Setup struktur folder (components, layouts, pages, lib, data, styles)
- [x] Setup **site config** (site + base di `astro.config.mjs` — GitHub Pages `/62/`)
- [x] Setup **navigation** (`src/lib/navigation.ts`)
- [x] Buat **BaseLayout.astro** (head, meta, canonical, OG tags, Header, Footer)
- [x] Setup **sitemap** (`@astrojs/sitemap`)
- [x] Setup **robots.txt** (`public/robots.txt`)
- [x] Setup **404 page** (`src/pages/404.astro`)

### Catatan perbedaan dari rencana awal

- ❌ Pagefind tidak dipakai → diganti **custom client-side search** (`src/pages/search.astro`)
- ❌ `WikiLayout.astro` tidak dibuat → semua halaman memakai BaseLayout
- ❌ `data/siteConfig.ts` tidak dibuat → site config ada di `astro.config.mjs`

---

## 2. 🧩 Komponen Dasar (UI & Layout)

### Sudah ada (`src/components/` — flat, tanpa subfolder)

- [x] `BaseLayout.astro` (di `src/layouts/`)
- [x] `Header.astro`
- [x] `Footer.astro`
- [x] `EntryIcon.astro` (icon library / gambar per entri)
- [x] `WikiCard.astro` (kartu generik lintas koleksi)
- [x] `AccessoryCard.astro`
- [x] `TamerList.astro`
- [x] `NoviceChallenge.astro`

### Belum ada (opsional / belum dibutuhkan)

- [ ] `Sidebar.astro` (navigasi saat ini via Header + `/hub`)
- [ ] `Breadcrumb.astro`
- [ ] `PrevNextNav.astro` (navigasi prev/next antar halaman)
- [ ] `SearchBox.astro` (search saat ini halaman terpisah `/search`)
- [ ] `TagBadge.astro` / `TagList.astro`
- [ ] `BackToTop.astro`
- [ ] `DarkModeToggle.astro`
- [ ] `TableOfContents.astro` (TOC otomatis)
- [ ] `ShareButtons.astro` (opsional)

---

## 3. 🧬 Komponen Khusus Wiki Digimon

- [x] `WikiCard.astro` — kartu generik untuk digimon & koleksi lain
- [x] `AccessoryCard.astro` — kartu khusus accessories
- [x] `EntryIcon.astro` — icon/emoji/gambar konsisten lintas halaman
- [ ] Filter panel digimon (attribute/rank/role) di listing `/digimon`
- [ ] `EvolutionCard.astro` / `EvolutionTree.astro` (jika dibutuhkan)
- [ ] `ItemTable.astro` — tabel drops (saat ini tabel markdown mentah di konten)
- [ ] `StatTable.astro` — tabel stats digimon
- [ ] `QuestCard.astro` / `QuestTimeline.astro` (belum ada konten quest)

---

## 4. 📄 Halaman & Routing (aktual)

### Halaman Utama

- [x] `/` — Landing page (`index.astro`)
- [x] `/hub` — Hub navigasi kategori
- [x] `/search` — Client-side search (index semua koleksi)
- [x] `/about` — Tentang wiki
- [x] `/404` — Not found page

### Halaman Kategori (per koleksi)

- [x] `/digimon` + `/digimon/[...slug]`
- [x] `/accessories` + `/accessories/[...slug]`
- [x] `/patchnote/[...slug]` (arsip versi + detail per patch)
- [x] `/[collection]` + `/[collection]/[...slug]` — routing otomatis untuk koleksi auto-discovered (dungeon, guide, items, playstyle, progression, system)

### Belum ada

- [ ] Filter query param (`?attribute=`, `?rank=`, `?role=`) di listing digimon
- [ ] Halaman per tag (`/tags/[tag]`)

---

## 5. 🗂️ Konten (Content Collection)

### Schema & Validasi

- [x] Finalisasi schema di `src/content.config.ts` — `digimon`, `accessories`, `patchnote` strict + `genericSchema` untuk koleksi auto-discovered
- [x] Validasi frontmatter via Zod berjalan otomatis saat build

### Inventory saat ini

- [x] **digimon** (~95 file): 12 root + `sss/` (60 file) + `sssplus/` (23 file)
- [x] **accessories** (13 file): Goggles, Digivice, D-Ark, True-Vice, Clothing, Deck, KeyRing, guide, dll
- [x] **patchnote** (4 file): 3.5.0, 3.5.1, 3.6.0
- [x] **dungeon**: overview + `Late-Game/` + `Mid-Game/`
- [x] **playstyle**: AA-DPS, SK (Overview/DPS/Gear/Recommended), TA (Overview/Gear/Recommended), TANK
- [x] **progression**: pre-early, early-game, mid-game, Introduction, List-of-Change, Pawnchessmon
- [x] **system** (7 file): overview, attribute, Tamer, Novice-Challenge, dll

### Perlu dilengkapi

- [ ] **playstyle**: SU / Support belum ada (baru AA, SK, TA)
- [ ] **guide**: baru 2 file (dungeon.md, test.md) — perlu beginner/progression/unlock/farm guide
- [ ] **items**: baru overview.md — perlu detail item per kategori (evolution item, data crystal, digi-egg, material)
- [ ] **digimon**: data stats lengkap (HP, ATK, DEF, SPD) & evolution requirements belum konsisten
- [ ] Bersihkan file uji sebelum production (`guide/test.md`, `system/basetest.md`, `system/basetest2.md`, `system/testnet.md`)
- [ ] Hapus file lama patchnote duplikat (`patch3.5.0.md`/`patch3.6.0.md` vs `3-5-0.md`/`3-5-1.md`)

---

## 6. 🔍 Search & SEO

- [x] Search: **custom client-side** (`search.astro`, index build-time dari semua koleksi — Pagefind tidak dipakai)
- [x] `<title>` & `<meta description>` di BaseLayout
- [x] Canonical URL (BaseLayout)
- [x] Open Graph tags + Twitter card + `og-image.png` (BaseLayout)
- [x] Sitemap generation (`@astrojs/sitemap`)
- [x] robots.txt
- [ ] JSON-LD structured data (schema.org) untuk halaman digimon
- [ ] (Opsional) Install `@astrojs/check` + `typescript` agar `npx astro check` bisa dijalankan

---

## 7. 🎨 Styling & Responsive

- [x] Global CSS variables & dark theme di `src/styles/global.css` (theme-color `#070b16`)
- [x] Card hover effect & typography dasar
- [ ] Audit responsive mobile menyeluruh
- [ ] Table responsive (scroll horizontal) untuk tabel drops/stats yang lebar
- [ ] Collapsible section untuk konten panjang (TOC belum ada)

---

## 8. ⚡ Performance & Build

- [x] Static output (`astro build`, minify bawaan)
- [ ] Audit Lighthouse (target 90+)
- [ ] Lazy loading gambar native (`loading="lazy"`)
- [ ] Image optimization → WebP (folder `public/` masih campur png/webp)
- [ ] Preload font (jika memakai webfont)

---

## 9. 🚀 Deployment & CI/CD

- [x] Deploy target: **GitHub Pages project site** (repo `andrynzyh/62`, `base: /62/` di `astro.config.mjs`)
- [ ] Inisialisasi git repo lokal (folder `.git` belum ada di project root)
- [ ] Setup CI/CD — `.github/workflows/deploy.yml` (build & deploy otomatis ke GitHub Pages on push `main`)
- [ ] Custom domain (opsional)

---

## 10. 🧪 Testing & Quality

- [ ] Install dependencies (`npm install` — `node_modules` belum ada di environment ini)
- [ ] `npm run build` sukses tanpa error (sekalian memvalidasi Zod schema)
- [ ] Test semua internal links (base path `/62/` via `withBase()` + remarkBaseLinks)
- [ ] Test search menemukan konten dari semua koleksi
- [ ] Test navigasi hub → semua kategori
- [ ] Test dark mode & responsive
- [ ] Test tabrakan spam click (UI interaktif: search, filter)

---

## 11. 🧹 Maintenance & Future Plan

- [ ] CONTRIBUTING.md untuk kontributor (skema frontmatter per koleksi)
- [ ] Editor tools untuk non-dev (opsional)
- [ ] RSS feed update terbaru (cocok untuk patchnote)
- [ ] Multi-language (i18n)
- [ ] Google Analytics / feedback widget (opsional)
- [ ] Versioning konten (jika perlu)

---

## 🗓️ Prioritas Selanjutnya

1. **Lengkapi konten tipis** — `guide/` (2 file) dan `items/` (1 overview) masih sangat tipis, tambah playstyle SU/Support
2. **Bersihkan file uji** — test.md, basetest, testnet, patchnote duplikat
3. **Setup CI/CD** — GitHub Actions workflow untuk auto-deploy
4. **SEO polish** — JSON-LD structured data untuk digimon
5. **Audit responsive + Lighthouse** (target 90+)
6. **TypeScript strict mode** (opsional)

---

## ✅ Definition of Done (DoD)

Setiap fitur/halaman dianggap selesai jika:

- [ ] `npm run build` sukses tanpa error (frontmatter lolos Zod schema)
- [ ] Halaman muncul di navigasi (`/hub`) & terindeks search
- [ ] Responsive di mobile & desktop
- [ ] Link internal valid (base path `/62/` benar di dev dan production)
- [ ] Lighthouse ≥ 90 (untuk halaman baru)
