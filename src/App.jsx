import { useState } from "react";
import "./styles.css";
import Input from "./components/Input";
import Output from "./components/Output";

function App() {
  const [outputState, setOutputState] = useState({ day: 0, month: 0, year: 0 });

  return (
    <>
      <header className="input">
        <Input setOutputState={setOutputState} outputState={outputState} />
      </header>

      <main className="output">
        <Output outputState={outputState} />
      </main>
    </>
  );
}

export default App;
