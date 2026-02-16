import { createContext, useEffect } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';

type Theme = 'light'; // | 'dark';
const DEFAULT_THEME: Theme = 'light';

interface ThemeContextOptions {
  theme: Theme;
  setTheme: (prevTheme: Theme | ((prevTheme: Theme) => Theme)) => void;
}

const ThemeContext = createContext<ThemeContextOptions>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

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

export default ThemeContext;
