import Schedule from "../Schedule/Schedule";
import MySchedule from "../Schedule/MySchedule";
import VenueMap from "../Schedule/VenueMap";
import Account from "../Account/Account";
import People from "../People/People";
import EventDetails from "../Event/EventDetails";
import Messages from "../Messages/Message";

const ContentView = ({ selectedTab, selectedEventId, onSelectEvent, onBack }) => {
  if (selectedTab === "Home") {
    return selectedEventId ? (
      <EventDetails eventId={selectedEventId} onBack={onBack} />
    ) : (
      <>
        <Schedule onSelectEvent={onSelectEvent} />
        <MySchedule />
        <VenueMap />
      </>
    );
  }

  switch (selectedTab) {
    case "Account":
      return <Account />;
    case "People":
      return <People />;
      case "Message":
        return <Messages/>
    default:
      return null;
  }
};

export default ContentView;
