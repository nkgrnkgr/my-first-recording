# コンポーネント

- Tailwind / `cva` を使ってよいのは `src/components/**` のみ。
- API は最小限で明確に。合理的な既定値を提供。
- 一度きりの props は避け、まず variant で表現できないか検討。
- DOM を増やさないために、必要に応じて `asChild` を提供。

## コンポーネント分類

- `components/ui/`: shadcn/ui由来のコンポーネント。外部から導入したもの。
- `components/layout/`: 汎用レイアウトプリミティブ（Flex, Stack, Inline, Center, Container, Spacer, Inset）
- `components/typography/`: 汎用テキストプリミティブ（Heading, Text等）
- `components/icons/`: アイコンシステム
- `components/app/`: アプリケーション固有だが再利用可能な「ある程度のかたまり」を持つUIコンポーネント
  - Header, Footer, ダイアログ系, メニュー系, カード系など
- `features/`: 再配置可能な機能単位。別のページに移したいときにサクッと移動できる単位

## 配置判断基準

1. shadcn/uiから持ってきた → `components/ui/`
2. レイアウト・間隔の汎用プリミティブ → `components/layout/`
3. テキスト表示の汎用プリミティブ → `components/typography/`
4. このアプリ特有だが「ある程度のかたまり」として再利用される見た目 → `components/app/`
5. 別のページに移したくなる可能性がある機能単位 → `features/`
