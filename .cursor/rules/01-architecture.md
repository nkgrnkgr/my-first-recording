# アーキテクチャ

- 3 レイヤ構成: `page` / `feature` / `components`。
- `page`（Next.js App Router）: 薄く保つ。ルーティングとデータ取得の入り口。UI 組み立ては `feature` と `components` に委譲。Tailwind 禁止。
- `feature`: 再配置可能な機能単位。ビジネスロジックと UI の組み立ては行うが、Tailwind は使わない。`components/layout` と `components/typography` のみで見た目を構成。
- `components`: デザインシステム（純見た目）。Tailwind / `cva` はここだけで使用可。
- 例外が必要になった場合は、まずプリミティブに variant を追加して解決する。
