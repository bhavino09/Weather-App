import "./App.css";
// import ConditionalComponent from "./components/ConditionalComponent";
import WeatherReport from "./components/WeatherReport";
// import GeoLocation from "./components/GeoLocation";
function App() {
  return (
    <div className="App">
      <WeatherReport />
      {/* <ConditionalComponent /> */}
      {/* <GeoLocation /> */}
    </div>
  );
}

export default App;
