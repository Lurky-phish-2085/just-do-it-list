import { useEffect, useRef } from "react";
import Index from "./Pages/Index";

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
    <div ref={divRef} className="container" style={{ padding: "16px" }}>
      <Index />
    </div>
  );
}

export default App;
