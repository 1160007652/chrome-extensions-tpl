import React, { useContext, useEffect, useState } from 'react';

import ThemeLight from '_assets/images/theme_light.svg';
import ThemeDark from '_assets/images/theme_dark.svg';

import './index.less';
interface ThemeContextInjected {
  theme: string; // 当前主题
  setTheme: React.Dispatch<string>; // 修改当前主题状态
}

export const ThemeContext = React.createContext<ThemeContextInjected>({} as ThemeContextInjected);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');

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
const SwitchThemes: React.FC = () => {
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
