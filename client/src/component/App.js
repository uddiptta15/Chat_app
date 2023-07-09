import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "../component/AuthentiCation/auth.css";
import HomeScreen from "./homeScreen/homeScreen";
import Body from "./homeScreen/homeBody";
import LogIn from "./AuthentiCation/LogIn/login";
import Register from "./AuthentiCation/Register/register";
import ChatScreen from "./chatPage/chatScreen";
import "../style.css";

function App() {
  return (<>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen />}>
          <Route exact path="" element={<Body />} />
          <Route exact path="user/login" element={<LogIn />} />
          <Route exact path="user/register" element={<Register />} />
        </Route>
        <Route exact path="/user/chat" element={<ChatScreen />} />
      </Routes>

    </Router>
  </>);
}
export default App;


