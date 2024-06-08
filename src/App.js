import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/Updateprofile";
import MyPosts from "./pages/Mypost";
import EarningsPage from "./pages/Userearnings";

function App() {
  return (
    <UserContextProvider>
      <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/posts" element={<MyPosts />} />
          <Route path="/earnings" element={<EarningsPage />} />
        </Route>
      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;