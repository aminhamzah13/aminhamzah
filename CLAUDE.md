# Portfolio Amin Hamzah

Stack: HTML + CSS + vanilla JS (`index.html`, `styles.css`, `script.js`), deploy via GitHub Pages. Tidak ada build step — buka `index.html` atau jalankan static server.

## Referensi desain v3 (pen.dev)

- File desain: `design/portfolio-v3.pen`. Akses HANYA lewat MCP `pencil` (`get_app_state`, `execute`). Jangan Read/Grep file `.pen` (terenkripsi).
- App Pen harus terbuka dengan file ini selama kerja.
- Spec lengkap ada di frame `XFRdG` (Handoff Spec) atau `design/handoff/png/00-handoff-spec.png`.
- Token: `design/handoff/tokens.css` = variable di file `.pen`. Pakai CSS variable, jangan hex.

| Target | Frame ID |
|---|---|
| Full desktop 1440 | LDmZr |
| Full tablet 768 | I2j6I |
| Full mobile 375 | w6LNl7 |
| Full mobile menu open | YBJd9 |
| Full project detail modal | W0sSzY |
| Lite desktop 1440 | kWcQ4 |
| Lite tablet 768 | iEVTp |
| Lite mobile 375 | ti5Et |
| Catatan data dummy | WYPcp |

## Aturan implementasi

- Update markup/CSS/JS yang sudah ada, jangan bikin ulang dari nol.
- Teks, icon (Phosphor), spacing, radius, dan font ikut desain persis.
- Jangan rusak yang sudah jalan: modal project (focus trap, keyboard), SEO/Open Graph/Schema.org, GA4, manifest, sitemap.
- Satu section satu commit, conventional commits. Jangan push ke `main`.
- Sebutkan rencana (maks 5 baris) sebelum mengubah lebih dari 3 file.

## Keputusan yang sudah diambil (v3)

- **Dark only.** Toggle dark/light dihapus.
- **Lite/Full = satu halaman + toggle.** `html[data-mode]`, disimpan di localStorage hanya saat user klik. `?mode=lite` / `?mode=full` untuk link langsung (tidak disimpan). Default Full.
- **Foto hero:** `images/avatar-v3.webp` (ilustrasi watercolor, background transparan). `images/avatar-amin.*` tetap dipakai untuk apple-touch-icon, manifest, dan Schema.org.
- **Data dummy** pakai teks desain, ditandai `TODO(dummy)` di `index.html` dan `script.js`. Cari: `grep -n "TODO(dummy)" index.html script.js`.
- Versi aset di-bump (`styles.css?v=…`, `script.js?v=…`) setiap rilis supaya pengunjung lama tidak dapat cache basi.

## Wajib tanya dulu

- Mengganti data dummy atau data yang beda antara Lite & Full (tools per project, jumlah tools) — jangan dikarang.
- Yang belum didesain: hover/focus/active (sekarang pakai usulan dasar), modal project di tablet & mobile (sekarang modal biasa yang menyesuaikan lebar).
