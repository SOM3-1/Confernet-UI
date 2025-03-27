import { useParams, useLocation } from "react-router-dom";
import Schedule from "../Schedule/Schedule";
import Account from "../Account/Account";
import People from "../People/People";
import EventDetails from "../Event/EventDetails";
import Messages from "../Messages/Message";

const ContentView = () => {
  const { eventId } = useParams();
  const location = useLocation();

  if (location.pathname === "/home") return <Schedule />;
  if (location.pathname.startsWith("/home/") && eventId) return <EventDetails eventId={eventId} />;
  if (location.pathname === "/home/account") return <Account />;
  if (location.pathname === "/home/people") return <People />;
  if (location.pathname === "/home/messages") return <Messages />;

  return null;
};

export default ContentView;
