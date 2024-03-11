import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Home from './pages/dashboard/home/Home.tsx';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
