import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Login from "./Login";
import KakaoRedirectHandler from "./KakaoRedirectHandler";
function App() {
  return (
    <div
      className="App"
      style={{
        position: "absolute",
        left: 0,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        fontSize: "20px",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
