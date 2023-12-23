import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChatIcon } from "./svg";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const { token } = user || {};
  const socket = null;
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              token ? <Home socket={socket} /> : <Navigate to="/login" />
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
