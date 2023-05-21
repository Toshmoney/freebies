import './App.css';
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import CreatePost from './Components/Posts/CreatePost';
import Signup from "./Components/Signup/Signup";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
    <Routes>
      <Route index element={<Home/>}  />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/create-post' element={<CreatePost/>}/>
    </Routes>
    </Router>
  );
}

export default App;
