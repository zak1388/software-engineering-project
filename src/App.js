import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Issue from './pages/issue/Issue.tsx';
import Home from './pages/dashboard/home/Home.tsx';
import TeamChat from './pages/dashboard/teamChat/TeamChat.tsx';
import Calendar from './pages/dashboard/calendar/Calendar.tsx';
import TimeAway from './pages/TimeAway/TimeAway.tsx';
import UserInfo from './pages/userInfo/userInfo.tsx';
import AdminIssues from './pages/AdminIssues/AdminIssues.tsx';
import TimeAwayRequest from './pages/TimeAway/TimeAwayRequest.tsx';
import Profile from './pages/dashboard/profile/Profile.tsx';
import ManageUsers from './pages/dashboard/manageUsers/ManageUsers.tsx';
import ManageTeams from './pages/dashboard/manageTeams/ManageTeams.tsx';
import ManagerAnnouncement from './pages/ManagerNotice/ManagerAnnounce.tsx';
import AdminAnnouncement from './pages/AdminNotice/AdminAnnounce.tsx';
import EditProfile from './pages/dashboard/profile/EditProfile.tsx';
import AdminViewRequests from './pages/adminViewRequests/AdminViewRequests.tsx';
import ManagerViewRequests from './pages/managerViewRequests/ManagerViewRequests.tsx';

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
            <Route path="/manageUsers" element={<ManageUsers />} />
            <Route path="/manageTeams" element={<ManageTeams />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/issue" element= {<Issue/>}/>
            <Route path="/adminNotice" element={<AdminAnnouncement/>}/>
            <Route path="/adminIssues" element= {<AdminIssues/>}/>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="ManagerNotice" element={<ManagerAnnouncement/>}/>
            <Route path="AdminNotice" element={<AdminAnnouncement/>}/>
            <Route path="/AdminIssues" element= {<AdminIssues/>}/>
          <Route path="/ManagerViewRequests" element={<ManagerViewRequests/>}/>
          </Route>
          <Route path="/profile/:id" element={<EditProfile />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/issue" element= {<Issue/>}/>
          <Route path="ManagerNotice" element={<ManagerAnnouncement/>}/>
          <Route path="AdminNotice" element={<AdminAnnouncement/>}/>
          <Route path ="/timeAway" element = {<TimeAway/>}/>
          <Route path ="/timeAwayRequest" element = {<TimeAwayRequest/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/AdminIssues" element= {<AdminIssues/>}/>
          <Route path="/AdminViewRequests" element={<AdminViewRequests/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
