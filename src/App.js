import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactNotifications, Store } from 'react-notifications-component';
import Navbar from './components/navbar';
import { Home } from './pages/home';
import SignUp from './pages/signUp';
import Login from './pages/login';
import { Logout } from './pages/logout';
import { Profile } from './pages/profile';
import { Artwork } from './pages/artwork';
import './style.scss';
import 'react-notifications-component/dist/theme.css';


function App() {

  React.useEffect(() => {
    sessionStorage.setItem('loggedIn', false);
  }, []);

  return (
    <Router>
    <Navbar />
    <ReactNotifications />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/artwork' element={<Artwork />} />
    </Routes>
    </Router>
  )
}

export default App;
