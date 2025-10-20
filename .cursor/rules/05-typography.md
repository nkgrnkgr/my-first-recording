# タイポグラフィ

- `src/components/typography` を使用:
  - `Heading`（`H1`-`H6` のラッパあり）
  - `Text` とそのエイリアス: `Body`（通常文）、`BodySmall`（小さめ、必要時は `Text size="small"`）、`Muted`（補足）、`ErrorText`（エラー）、`Caption`（キャプション）、`LinkText`（テキストリンク）
- page/feature でテキストの Tailwind クラス直書きは禁止。variant を追加して拡張する。
- 共有バリアント: `align`（left/center/right）、`tone`（default/muted/destructive）、`weight`（normal/medium/semibold）、`leading`（normal/relaxed/tight）。
- セマンティックなラッパを優先し、記述の可読性と再利用性を維持。
