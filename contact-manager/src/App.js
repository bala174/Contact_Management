import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage.js';
import Signup from './Components/Signup.js';
import User from './Components/User.js'
import Newcontact from './Components/Newcontact.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/User' element={<User/>}></Route>
        <Route path='/Newcontact' element={<Newcontact/>}></Route>
      </Routes>
    </>
  );
}

export default App;
