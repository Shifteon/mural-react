import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import { Home } from './pages/home';
import SignUp from './pages/signUp';
import Login from './pages/login';
import './style.scss';


function App() {

  React.useEffect(() => {
    sessionStorage.setItem('loggedIn', false);
  }, []);

  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
    </Routes>
    </Router>
  )
}

export default App;
