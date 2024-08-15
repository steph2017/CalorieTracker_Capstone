import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'

//API Calls
import { getExpandedLogs } from './services/logs-api';
import { getUsers } from './services/users-api';

//Pages
import AddNew from './pages/AddNew';
import LandingPage from './pages/LandingPage';
import LoggedInAs from './pages/LoggedInAs';
import ViewEdit from './pages/ViewEdit';

//Components
import Navbar from './components/Navbar';

function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [allLogs, setAllLogs] = useState([]);
  const [userlogs, setUserLogs] = useState([]);
  const [singlelog, setLog] = useState({});


  useEffect(() => {
    const initialFetch = async () => {
      try {
        // const usersResponse = await fetch(`${apiUrl}/users`);
        // const logsResponse = await fetch(`${apiUrl}/logs/expand`);
        const usersdata = await getUsers();
        const logsdata = await getExpandedLogs();

        // console.log(usersdata)
        // console.log(logsdata)

        setUsers(usersdata);
        setAllLogs(logsdata);

        const latestUser = usersdata.reduce((prev, current) => (prev.id > current.id ? prev : current));
        setUser(latestUser);

        const LogsofUser = logsdata.filter(log => log.user_id === latestUser.id);
        setUserLogs(LogsofUser);

        const lastLog = LogsofUser.reduce((prev, current) => (prev.date > current.date ? prev : current));
        setLog(lastLog);

      } catch (error) {
        console.error("Error fetching users and logs:", error);
      }
    };
    initialFetch();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage allLogs={allLogs} setAllLogs={setAllLogs} userlogs={userlogs} users={users} setUsers={setUsers} user={user} setUser={setUser} singlelog={singlelog} />} />
          <Route path="/add/log" element={<AddNew />} />
          <Route path="/add/user" element={<AddNew />} />
          <Route path="/add/food" element={<AddNew />} />
          <Route path="/view/food" element={<ViewEdit />} />
          <Route path="/edit/food" element={<ViewEdit />} />
          <Route path="/view/log" element={<ViewEdit />} />
          <Route path="/edit/log" element={<ViewEdit />} />
          <Route path="/view/user" element={<ViewEdit />} />
          <Route path="/edit/user" element={<ViewEdit />} />
          <Route path="/selectuser" element={<LoggedInAs allLogs={allLogs} setAllLogs={setAllLogs} userlogs={userlogs} users={users} setUsers={setUsers} user={user} setUser={setUser} singlelog={singlelog} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
