import { useRef } from "react";
import "./styles/styles.css";
import Input from "./components/Input";
import Output from "./components/Output";

function App() {
  const daysRef = useRef("--");
  const monthsRef = useRef("--");
  const yearsRef = useRef("--");

  return (
    <>
      <header className="input">
        <Input daysRef={daysRef} monthsRef={monthsRef} yearsRef={yearsRef} />
      </header>

      <main className="output">
        <Output daysRef={daysRef} monthsRef={monthsRef} yearsRef={yearsRef} />
      </main>
    </>
  );
}

export default App;
