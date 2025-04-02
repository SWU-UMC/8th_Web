
import Navbar from "./Navbar";
import ThemeContext from "./ThemeContent";
import  ThemeContent  from "./ThemeContent";
import { ThemeProvider } from "./provider/ThemeProvider";


export default function ContextPage(): React.ReactElement {
    
    return (
      <ThemeProvider>
        <div className ='flex flex-col items-center justify-center min-h-screen'>
          <Navbar/>
          <main className="flex-1 w-full">
          <ThemeContext/>
          </main>
        </div>       
      </ThemeProvider>
    );
  };
  