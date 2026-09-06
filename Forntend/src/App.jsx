
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Login from "./login/Login";
import Register from "./login/Register";
import GeneratePassword from "./pages/GeneratePassword";
import Vault from "./pages/Vault";
import HowItWorks from "./pages/Work";
import Security from "./pages/Security";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>RESIDER Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/generate" element={<GeneratePassword />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

