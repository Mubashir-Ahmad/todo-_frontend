import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
 
} from "react-router-dom";
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import Edit from './component/edit/Edit';
function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/edit/:id" element={<Edit />} />
      </Routes>
      </Router>
  );
}

export default App;
