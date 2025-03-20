import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Login/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Login/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
