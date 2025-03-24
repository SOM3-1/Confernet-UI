import Schedule from "../Schedule/Schedule";
import MySchedule from "../Schedule/MySchedule";
import VenueMap from "../Schedule/VenueMap";
import Account from "../Account/Account";
import People from "../People/People";

const ContentView = ({ selectedTab }) => {
  switch (selectedTab) {
    case "Account":
      return <Account />;
    case "People":
      return <People />;
    case "Home":
    default:
      return (
        <>
          <Schedule />
          <MySchedule />
          <VenueMap />
        </>
      );
  }
};

export default ContentView;
