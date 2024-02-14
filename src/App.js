import "./index.css";
import NavbarDefault from "./component/Navbar/Nav";
import FooterWithLogo from "./component/Footer/footer";
import Home from "./component/Home";
import Status404 from "./component/404/404";
import SignCard from "./component/login/signin";
import LoginCard from "./component/login/login";
import DesCard from "./component/card/descard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavbarDefault />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignCard />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/descard" element={<DesCard />} />
        {/* <Route path="/reward" element={<Reward />} /> */}
        <Route path="*" element={<Status404 to="/" />} />
      </Routes>
      <FooterWithLogo />
    </Router>
  );
}

export default App;
