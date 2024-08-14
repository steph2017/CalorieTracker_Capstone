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


  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const usersResponse = await fetch(`${apiUrl}/users`);
        const logsResponse = await fetch(`${apiUrl}/logs/expand`);

        const usersData = await usersResponse.json();
        const logsData = await logsResponse.json();

        setUsers(usersData);
        setLogs(logsData);

        const latestUser = usersData.reduce((prev, current) => (prev.id > current.id ? prev : current));
        setUser(latestUser);
      } catch (error) {
        console.error("Error fetching users and logs:", error);
      }
    };
    fetchUsersAndLogs();
  }, [apiUrl]);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExpandedLog users={users} logs={logs} user={user} setUser={setUser} />} />
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
