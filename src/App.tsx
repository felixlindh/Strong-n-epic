import React, {useState } from 'react';
import Test from './test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { UserInterface } from './types/UserInterface';
import HomePage from './pages/HomePage';

const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: []
}

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<LoginPage setCurrentUser={setCurrentUser} />} />
      <Route path='/test'  element={<Test />}/>
      <Route path='/home' element={ <HomePage />} />
     </Routes>
    </div>
    </Router>
  );
}

export default App;
