import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LocaleEnUS from '_assets/locales/en';
import LocaleZhCN from '_assets/locales/zh';

const resources = {
  enUS: LocaleEnUS,
  zhCN: LocaleZhCN,
};

i18n
  .use(initReactI18next) // 将i18n传递给react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') ?? 'enUS',

    keySeparator: false, // 我们不会在message.welcome表单中使用键

    interpolation: {
      escapeValue: false, // 从xss反应已经安全
    },
  });

export default i18n;
