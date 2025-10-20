# レイアウト

- `src/components/layout` のプリミティブを使用:
  - `Flex`（中核）、`Stack`（column 既定）、`Inline`（row 既定）、`Center`（中央寄せ既定）
  - `Container`（横幅・ガター・縦余白の制御）
  - `Spacer`（外側の距離／一時的な間隔調整。axis/size/grow）
  - `Inset`（内側余白の付与。axis/size）

- 中核は `Flex`。`Stack/Inline/Center` は可読性向上のための薄いラッパ。
- レイアウト調整は variant を追加して対応。page/feature での Tailwind クラス直書きは不可。

## Container の方針
- 既定は `width="xl"`。全幅が必要な箇所のみ `width="fluid"`。
- ページ全体で 1 箇所置くのを既定とし、セクション単位で別幅が必要なときのみ、その直下に追加。
- 余白は `gutters`/`yPadding` を優先し、任意の `px-*` は最小限。

## Spacer の方針
- まずは `gap`（`Flex/Stack/Inline`）で解決する。困る場合のみ `Spacer` を使用。
- API: `axis`（x/y/both）、`size`（none/xs/sm/md/lg/xl/2xl）、`grow`。
- フレックスの“余白として伸びる”用途は `grow` を使用。

## Inset の方針
- 近接要素の“くっつき”を避けるための内側余白ラッパ。
- API: `axis`（x/y/both）、`size`（none/xs/sm/md/lg/xl/2xl）。
- 使い分け: 外側の間は `Spacer`、内側の詰めは `Inset`、複数子の間隔は `gap`。

## Sidebar とコンテンツの回避パターン
- サイドバーが `fixed` の場合、コンテンツ側は `flex` コンテナ内で同幅のスペーサー（例: `w-56 shrink-0` または `Spacer axis="x"`）を挿入して重なり回避。
- 折りたたみ（例: `w-16`）時は状態に応じてスペーサー幅を同期。将来的に CSS 変数での同期を検討可。
