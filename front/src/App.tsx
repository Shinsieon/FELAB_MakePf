import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [apiResult, setApiResult] = useState("");

  axios.get("/apiHome").then((response) => {
    setApiResult(response.data);
  });

  return (
    <div className="App">
      <h1>{apiResult}</h1>
    </div>
  );
}

export default App;
