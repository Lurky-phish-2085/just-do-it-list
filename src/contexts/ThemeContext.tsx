import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";

type Theme = "dark" | "light" | "no-preference";

type ThemeContextType = {
  switchTheme: () => void;
  theme: Theme;
};

type ThemeProviderProps = {
  children: ReactNode;
  [key: string]: any;
};

const ThemeContext = createContext({} as ThemeContextType);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR && document.querySelector("html");
  const systemPrefersColorScheme = usePrefersColorScheme();
  const defaultTheme = systemPrefersColorScheme || "light";

  const [selectedTheme, setSelectedTheme] =
    useLocalStorageState<Theme>("picoColorScheme");

  const [theme, setTheme] = useState<Theme>("light");

  const switchTheme = () => {
    setSelectedTheme(theme === "dark" ? "light" : "dark");
  };

  const setDataThemeAttribute = (theme: Theme) => {
    if (htmlTag) {
      htmlTag.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => {
    const theme = selectedTheme ? selectedTheme : defaultTheme;

    if (htmlTag) {
      setDataThemeAttribute(theme);
      setTheme(theme);
    }
  }, [htmlTag, defaultTheme, selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
        ...props,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
