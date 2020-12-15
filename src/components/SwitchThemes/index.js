import React, { useContext, useEffect, useState } from 'react';

import ThemeLight from '_assets/images/theme_light.svg';
import ThemeDark from '_assets/images/theme_dark.svg';

import './index.less';

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    window.document.body.setAttribute('data-theme-type', theme);
  }, [theme]);

  useEffect(() => {
    let mediaQueryListDark = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryListDark.onchange = (mediaQueryListEvent) => {
      if (mediaQueryListEvent.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    return () => {
      mediaQueryListDark.onchange = null;
      mediaQueryListDark = null;
    };
  }, []);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * 主题组件
 */
const SwitchThemes = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleToggleThemes = (value) => {
    return () => {
      theme !== value && setTheme(value);
    };
  };

  return (
    <div className="components-switch-themes">
      {theme === 'light' ? (
        <img src={ThemeDark} onClick={handleToggleThemes('dark')} />
      ) : (
        <img src={ThemeLight} onClick={handleToggleThemes('light')} />
      )}
    </div>
  );
};

export default SwitchThemes;
