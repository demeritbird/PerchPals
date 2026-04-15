import { DEFAULT_THEME, Theme, ThemeContext, ThemeContextOptions } from '@/hooks/useTheme';
import { useEffect } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';

export function ThemeProvider(props: React.PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const ThemeContextValue: ThemeContextOptions = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={ThemeContextValue}>{props.children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
