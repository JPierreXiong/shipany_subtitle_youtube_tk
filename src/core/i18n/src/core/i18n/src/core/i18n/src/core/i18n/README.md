```markdown
# src/core/i18n

This directory contains simple internationalization (i18n) resources for the project.

Files
- en.json - English translations
- zh.json - Chinese translations
- index.ts - Small helper to get/set locale and retrieve translated strings

Usage (example)
```ts
import { t, setLocale } from 'src/core/i18n';

setLocale('zh');
console.log(t('app.title')); // -> "Shipany 字幕工具"
```

Notes
- If using TypeScript, enable "resolveJsonModule": true in tsconfig.json to allow importing JSON files.
- This is intentionally minimal. For production-grade apps consider using established libraries (i18next, react-intl, lingui, etc.) to handle plurals, nested fallbacks, formatting, and asynchronous loading.
```
