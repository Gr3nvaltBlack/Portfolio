import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import NewPost from "../pages/NewPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost previsualization={true} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

const AppRouterNotConnected = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
        <Route path="/welcomepage" element={<WelcomePage />} index/>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
export {
  AppRouterNotConnected
}