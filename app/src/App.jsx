import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/main-pages/Home';
import AdminPanel from './pages/admin-pages/AdminPanel';
import Register from './pages/main-pages/Register';
import UpdateRide from './pages/main-pages/UpdateRide';
import Pilot from './pages/main-pages/Pilot';
import Passenger from './pages/main-pages/Passenger';
import Login from './pages/main-pages/Login';
import PassengerRegister from './pages/main-pages/PassengerRegister';
import PassengerLogin from './pages/main-pages/PassengerLogin';
import PilotLogin from './pages/main-pages/PilotLogin';
import PilotRegister from './pages/main-pages/PilotRegister';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pilot-login" element={<PilotLogin />} />
        <Route path="/pilot-register" element={<PilotRegister />} />
        <Route path="/passenger-login" element={<PassengerLogin />} />
        <Route path="/passenger-register" element={<PassengerRegister />} />
        <Route path="/update" element={<UpdateRide />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/passenger" element={<Passenger />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
