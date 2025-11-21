import { Route, Routes } from "react-router-dom";
import "./App.css";

import Callback from "./components/Callback";
import Landing from "./components/Landing";
interface AppProps {
  forceLanding?: boolean;
}

function App({ forceLanding = false }: AppProps) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {!forceLanding && <Route path="/callback" element={<Callback />} />}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
