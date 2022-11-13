import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import SignUp from './pages/signUp';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route path='/signUp' element={<SignUp />} />
    </Routes>
    </Router>
  )
}

export default App;
