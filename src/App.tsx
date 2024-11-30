import { useEffect, useRef } from "react";
import Index from "./Pages/Index";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setMinHeight = () => {
      if (!divRef.current) return;
      divRef.current.style.minHeight = `${window.innerHeight}px`;
    };
    setMinHeight();
    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={divRef} className="container" style={{ padding: "16px" }}>
        <Index />
      </div>
    </ThemeProvider>
  );
}

export default App;
