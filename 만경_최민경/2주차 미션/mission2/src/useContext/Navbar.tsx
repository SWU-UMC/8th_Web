import { useContext } from "react";
import {THEME, ThemeContext, useTheme} from "./provider/ThemeProvider"
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from "clsx";

export default function Navbar(): React.ReactElement {
  const {theme, toggleTheme}=useTheme();

  const isLightMode=theme ===THEME.LIGHT;

  console.log(theme);

    return (      
      <nav className={clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white': 'bg-'
      )}
      >
        <ThemeToggleButton/>
        
      </nav>
        
    )
  }
  