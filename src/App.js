import React from "react";
import AddRoutesBlock from "./components/AddRoutesBlock"
import RoutesList from "./components/RoutesList"
import MapBlock from "./components/MapBlock"
import ExampleData from "./components/ExampleData";

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <ExampleData />
          <AddRoutesBlock />
          <RoutesList />
        </div>
        <div className="col-sm-8 mt-3">
          <MapBlock />
        </div>
      </div>
    </div>
  );
};

export default App