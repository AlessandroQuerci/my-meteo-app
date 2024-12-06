import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import MyFooter from "./components/MyFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./components/Details";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
