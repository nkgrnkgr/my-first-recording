# 禁止事項

- `src/app/**` では `layout.tsx` を除き Tailwind クラスを使用しない。
- `feature/*` では Tailwind クラスを使用しない。見た目は `components/layout` と `components/typography` で構成する。
- `lucide-react` を page/feature から直接 import しない。`Icon` を経由する。
- インライン style は原則禁止。トークンと variant を優先。
- 一度きりの専用コンポーネントを増やさない。まずは既存プリミティブの variant で表現する。
 - page/feature での `m-*`/`p-*` の直書きは禁止。`gap`/`Container`/`Spacer`/`Inset` を使用。
