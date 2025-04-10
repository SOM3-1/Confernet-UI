/* This code snippet is a React component named `App` that sets up the routing for a web application
using React Router. Here's a breakdown of what the code is doing: */
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Login/Signup";
import Login from "./Components/Login/Login";
import Menu from "./Components/Main/Menu";
import Account from "./Components/Account/Account";
import People from "./Components/People/People";
import Messages from "./Components/Messages/Message";
import Schedule from "./Components/Schedule/Schedule";
import { AuthListener } from "./Components/Login/AuthListener"
import EventDetails from "./Components/Event/EventDetails";

function App() {
  return (
    <Routes>
      <Route element={<AuthListener />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Menu />}>
          <Route index element={<Schedule />} />
          <Route path=":eventId" element={<EventDetails />} />
          <Route path="account" element={<Account />} />
          <Route path="people" element={<People />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
