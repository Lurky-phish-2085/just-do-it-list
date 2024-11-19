import { useEffect, useRef } from "react";
import Dashboard from "./Pages/Dashboard";

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
    <div ref={divRef} className="container">
      <Dashboard />
    </div>
  );
}

export default App;
