import { THEME, useTheme } from "./provider/ThemeProvider";
import clsx from "clsx";

export default function ThemeContext(): React.ReactElement {
    const {theme, toggleTheme}=useTheme();
  
    const isLightMode=theme ===THEME.LIGHT;
 

    return (
      <div className={clsx(
        'p-4 h-dvh w-full',
        isLightMode ? 'bg-white' : 'bg-gray-800'
      )}>
        <h1 className={clsx(
          'text-4xl font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}>
          Theme Content
        </h1>
        <p className={clsx(
          'text 4xl font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}>안뇽 야호~~~!!</p>
      </div>
    );
  }    