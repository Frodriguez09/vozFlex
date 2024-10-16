import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from'./pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import VotingPage from './pages/VotingPage';
import Landing from "./components/Landing";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/"
          // element={<EmployeePage />} />
          element={<Landing />} />
        <Route path="/admin"
          element={<AdminPage />} />
        <Route path="/voting"
          element={<VotingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
