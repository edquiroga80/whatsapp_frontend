import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatIcon } from "./svg";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div>
      <h1 className="text-green_1 font-bold bg-dark_bg_2">
        Hola desde el FRONTEND
      </h1>
      <ChatIcon className="fill-amber-500" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
