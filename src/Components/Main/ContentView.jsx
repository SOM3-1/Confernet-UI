/**
 * The ContentView component in this JavaScript React code dynamically renders different components
 * based on the current URL path.
 * @returns The ContentView component is returning different components based on the current location
 * pathname. If the pathname is "/home", it returns the Schedule component. If the pathname starts with
 * "/home/" and there is an eventId parameter, it returns the EventDetails component with the eventId
 * passed as a prop. If the pathname is "/home/account", it returns the Account component. If the
 * pathname is "/home/people", it returns
 */
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
