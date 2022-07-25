import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.less';

/**
 * 其它组件
 */
function SwitchLanguage() {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    i18n.changeLanguage('zhCN');
  };

  // const MenuList = (
  //   <Menu onClick={handleToggleLanguage} style={{ minWidth: '100px' }}>
  //     <Menu.Item key="zhCN">{t('zhCN')}</Menu.Item>
  //     <Menu.Item key="enUS">{t('enUS')}</Menu.Item>
  //   </Menu>
  // );

  // return (
  //   <Dropdown overlay={MenuList} style={{ cursor: 'pointer' }} placement="bottomRight">
  //     <div className="components-switch-language">
  //       <span style={{ marginRight: '6px' }}>{t(i18n.language)}</span>
  //       <DownOutlined />
  //     </div>
  //   </Dropdown>
  // );

  return <div onClick={handleToggleLanguage}>切换语言</div>;
}

export default SwitchLanguage;
