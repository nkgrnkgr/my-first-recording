# アイコン

## 基本方針

- `src/components/icons` の `Icon` を使用。
- 新しいアイコンは `iconRegistry` に追加申請・追加実装する。
- page/feature で `lucide-react` を直接 import しない。必ず `Icon` を経由する。

## バリアント

- `size`: `xs`（12px）、`sm`（16px）、`md`（20px）、`lg`（24px）、`xl`（32px）
- `tone`: `default`（通常）、`muted`（薄く）、`primary`（強調）、`secondary`（準強調）、`destructive`（危険）
- `strokeWidth`: `1`（細い）、`1.5`（標準）、`2`（太い）

## 使用例

```tsx
// 基本
<Icon name="home" />

// ボタン内（装飾的）
<button>
  <Icon name="search" size="sm" decorative />
  検索
</button>

// 状態表示（意味のあるアイコン）
<Icon name="alertCircle" tone="destructive" aria-label="エラー" />

// カスタマイズ
<Icon name="user" size="lg" tone="primary" strokeWidth={1.5} />
```

## アクセシビリティ

- **装飾のみ**: `decorative={true}` で `aria-hidden="true"` を自動付与
- **意味あり**: `aria-label="説明文"` を必ず付与
- テキストと併用する場合は装飾扱いにすることが多い

## 推奨パターン

### ナビゲーション
```tsx
<Icon name="home" size="sm" decorative />
<Icon name="user" size="sm" decorative />
<Icon name="settings" size="sm" decorative />
```

### フォーム・入力
```tsx
<Icon name="search" size="sm" decorative />
<Icon name="mail" size="sm" decorative />
<Icon name="phone" size="sm" decorative />
```

### 状態・フィードバック
```tsx
<Icon name="check" tone="primary" aria-label="成功" />
<Icon name="alertCircle" tone="destructive" aria-label="エラー" />
<Icon name="info" tone="muted" aria-label="情報" />
```

### アクション
```tsx
<Icon name="x" size="sm" aria-label="閉じる" />
<Icon name="chevronRight" size="xs" decorative />
```

## 非推奨パターン

```tsx
// ❌ lucide を直接 import
import { Home } from "lucide-react";

// ❌ 意味のあるアイコンに decorative
<Icon name="alertCircle" decorative /> 

// ❌ 装飾アイコンに aria-label
<Icon name="chevronRight" aria-label="右矢印" />

// ❌ カスタム SVG を直接使用
<CustomSvg className="size-4" />
```

## カスタム SVG 追加

1. React FC として実装
2. `iconRegistry` に追加
3. `IconName` 型が自動更新される

```tsx
// registry.ts に追加例
const CustomLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="..." />
    </svg>
  );
};

export const iconRegistry = {
  // ...既存
  customLogo: CustomLogo,
} as const;
```
