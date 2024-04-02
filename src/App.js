import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Issue from './pages/issue/Issue.tsx';
import Home from './pages/dashboard/home/Home.tsx';
import TeamChat from './pages/dashboard/teamChat/TeamChat.tsx';
import Calendar from './pages/dashboard/calendar/Calendar.tsx';
import TimeAway from './pages/TimeAway/TimeAway.tsx';

import TimeAwayRequest from './pages/TimeAway/TimeAwayRequest.tsx';
=======
import Profile from './pages/dashboard/profile/Profile.tsx';


function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" index element={<Login />}/>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" index element={<Home />} />
            <Route path="/timeAway" element={<TimeAway />}/>
            <Route path ="/timeAwayRequest" element = {<TimeAwayRequest/>}/>
            <Route path="teamChat" element={<TeamChat />}/>
            <Route path="/calendar" element={<Calendar />}/>
          </Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/issue" element= {<Issue/>}/>
          <Route path ="/timeAway" element = {<TimeAway/>}/>

          <Route path ="/timeAwayRequest" element = {<TimeAwayRequest/>}/>
          <Route path="/login" element={<Login />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
