import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'

//Pages
import AddNew from './pages/AddNew';
import ExpandedLog from './pages/ExpandedLog';
import LoggedInAs from './pages/LoggedInAs';
import ViewEdit from './pages/ViewEdit';

//Components
import Navbar from './components/Navbar';

function App() {
  const apiUrl = process.env.VITE_API_URL;
  const apiKey = process.env.VITE_API_KEY;

  const [user, setUser] = useState("");

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExpandedLog />} />
          <Route path="/add/log" element={<AddNew />} />
          <Route path="/add/user" element={<AddNew />} />
          <Route path="/add/food" element={<AddNew />} />
          <Route path="/view/food" element={<ViewEdit />} />
          <Route path="/edit/food" element={<ViewEdit />} />
          <Route path="/view/log" element={<ViewEdit />} />
          <Route path="/edit/log" element={<ViewEdit />} />
          <Route path="/view/user" element={<ViewEdit />} />
          <Route path="/edit/user" element={<ViewEdit />} />
          <Route path="/selectuser" element={<LoggedInAs />} />
        </Routes>
      </div>
    </>
  )
}

export default App
