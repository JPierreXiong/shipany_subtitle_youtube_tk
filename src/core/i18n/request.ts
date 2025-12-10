// src/core/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';

// 这里定义默认语言（你可以改成 zh 或其他）
export default getRequestConfig(async ({ request }) => {
  return {
    locale: 'en',
    messages: (await import(`./messages/en.json`)).default
  };
});
