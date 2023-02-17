import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Topbar from "./Topbar";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-neutral-950">
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
