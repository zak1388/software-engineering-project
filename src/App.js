import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Issue from './pages/issue/Issue.tsx';
import Home from './pages/dashboard/home/Home.tsx';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" index element={<Home />} />
            <Route path="/timeAway" />
            <Route path="teamChat" />
            <Route path="/calendar" />
          </Route>
          <Route path="/issue" element= {<Issue/>}/>
          <Route path ="/timeAway" element = {<TimeAway/>}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
