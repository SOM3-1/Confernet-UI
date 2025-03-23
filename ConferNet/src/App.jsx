import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Login/Signup";
import Login from "./Components/Login/Login";
import Menu from "./Components/Login/Menu";
import Account from "./Components/Account/Account";
import People from "./Components/People/People";
import Messages from "./Components/Messages/Message";
import HomeContent from "./Components/Home/HomeContent";
import Schedule from "./Components/Schedule/Schedule";
import MySchedule from "./Components/Schedule/MySchedule";
import VenueMap from "./Components/Schedule/VenueMap";
import SessionInteraction from "./Components/Session/Session Interaction";
import {AuthListener} from "./Components/Login/AuthListener"

function App() {
  return (
    <Routes>
    <Route element={<AuthListener />}>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Menu />} />
      <Route path="/account" element={<Account />} />
      <Route path="/people" element={<People />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/MyContent" element={<HomeContent />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/mySchedule" element={<MySchedule />} />
      <Route path="/venue" element={<VenueMap />} />
      <Route path="/session" element={<SessionInteraction />} />
    </Route>
  </Routes>
  );
}

export default App;
