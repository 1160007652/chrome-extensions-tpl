import React from 'react';
import intl from 'react-intl-universal';
import { languageEvent, EVENT_LIST } from '_src/utils/events';
import { observer } from 'mobx-react';

import './index.less';

/**
 * 其它组件
 */
const SwitchLanguage = (props) => {
  const handleToggleLanguage = (lang) => {
    return () => {
      languageEvent.emit(EVENT_LIST.CHANGE_LANGUAGE, lang);
    };
  };
  return (
    <div className="components_outher">
      切换多语言
      <div onClick={handleToggleLanguage('zhCN')}>{intl.get('locale_zh')}</div>
      <div onClick={handleToggleLanguage('enUS')}>{intl.get('locale_en')}</div>
    </div>
  );
};

export default SwitchLanguage;
