import { createContext, useContext } from 'react';
import { DEFAULT_THEME, Theme } from './../contexts/ThemeProvider';

export interface ThemeContextOptions {
  theme: Theme;
  setTheme: (prevTheme: Theme | ((prevTheme: Theme) => Theme)) => void;
}

export const ThemeContext = createContext<ThemeContextOptions>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

/**
 * allows users to toggle between different themes
 * provided by the application
 *
 * @example
 * const { setTheme } = useTheme()
 * setTheme('light')
 */
const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
