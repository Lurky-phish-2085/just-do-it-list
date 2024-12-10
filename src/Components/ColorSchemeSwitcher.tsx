import { AnchorHTMLAttributes, MouseEvent } from "react";
import { useTheme } from "../contexts/ThemeContext";
import IconMoon from "../Icons/IconMoon";
import IconSun from "../Icons/IconSun";

function ColorSchemeSwitcher(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { switchTheme, theme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const nextThemeLabel =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  const handleSwitchTheme = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    switchTheme();
  };

  return (
    <a
      href={`#${nextTheme}`}
      aria-label={nextThemeLabel}
      onClick={handleSwitchTheme}
      {...props}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </a>
  );
}

export default ColorSchemeSwitcher;
