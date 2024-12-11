// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup'; 
import MainDashboard from './DashBoards/MainDashboard';
import CreateHabit from './pages/CreateHabit';
import Accounts from './components/Accounts';
function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/MainDashboard" element={<MainDashboard />} />
          <Route path="/CreateHabit" element={<CreateHabit />} />
          <Route path='/accounts' element={<Accounts/>}></Route>
        </Routes>
      </Router>
    

  );
}

export default App;
