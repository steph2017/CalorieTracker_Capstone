import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'

//Pages
import AddNew from './pages/AddNew';
import LandingPage from './pages/LandingPage';
import LoggedInAs from './pages/LoggedInAs';
import ViewEdit from './pages/ViewEdit';

//Components
import Navbar from './components/Navbar';

function App() {
  // const apiUrl = import.meta.env.VITE_API_URL; - couldn't get .env set up for frontend so im hardcoding the values
  // const apiHomeUrl = import.meta.env.VITE_API_HOMEURL;

  const apiUrl = "https://calorietracker-capstone.onrender.com"
  const apiHomeUrl = "http://localhost:2222"


  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState({});

  const allLogs = [];
  const allUsers = [];

  useEffect(() => {
    const initialFetch = async () => {
      try {
        console.log(apiUrl);
        console.log(apiHomeUrl);
        // const usersResponse = await fetch(`${apiUrl}/users`);
        // const logsResponse = await fetch(`${apiUrl}/logs/expand`);
        const usersResponse = await fetch(`${apiHomeUrl}/users`);
        const logsResponse = await fetch(`${apiHomeUrl}/logs/expand`);
        console.log(usersResponse);

        allUsers = await usersResponse.json();

        allLogs = await logsResponse.json();

        setUsers(allUsers);

        const latestUser = allUsers.reduce((prev, current) => (prev.id > current.id ? prev : current));
        setUser(latestUser);

        const latestLogofUser = allLogs.filter(log => log.user_id === latestUser);
        setLogs(latestLogofUser);

      } catch (error) {
        console.error("Error fetching users and logs:", error);
      }
    };
    initialFetch();
  }, [apiHomeUrl]);
  //}, [apiUrl]);
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage allLogs={allLogs} allUsers={allUsers} logs={logs} user={user} setUser={setUser} setLogs={setLogs} />} />
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
