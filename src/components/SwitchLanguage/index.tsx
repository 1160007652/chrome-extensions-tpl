import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.less';

/**
 * 其它组件
 */
const SwitchLanguage = () => {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    console.log(i18n.language);
    i18n.changeLanguage(i18n.language == 'zhCN' ? 'enUS' : 'zhCN');
  };

  return <div onClick={handleToggleLanguage}>语言</div>;
};

export default SwitchLanguage;
