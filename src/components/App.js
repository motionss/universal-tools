import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Topbar from "./Topbar";
import Home from "./Home";

function App() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-neutral-950">
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
