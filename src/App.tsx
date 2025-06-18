import MapComponent from "./components/InteractiveMap/InteractiveMap"; // adjust path if needed
import "./global.css";
import LeftSidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Map Container */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* SIDEBAR */}
        <LeftSidebar />

        {/* MAP COMPONENT */}
        <div style={{ flex: 1 }}>
          <MapComponent />
        </div>
      </div>
    </div>
  );
}
