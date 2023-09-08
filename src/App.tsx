import React, {useState } from 'react';
import Test from './test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { UserInterface } from './types/UserInterface';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Register from './pages/Register';

export const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: []
}

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const errorMsg = "You need to log in to access the home page"
  const errorMsgAdmin = "You do not have permisson to access this page"
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<LoginPage setCurrentUser={setCurrentUser} />} />
      <Route path='/register'  element={<Register />}/>

      <Route path='/home' 
      element={currentUser.id !== "" ? 
      <HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} /> : 
      <LoginPage setCurrentUser={setCurrentUser} errorMsg={errorMsg} />} />

      <Route path='/admin' 
      element={currentUser.role === "ADMIN" ? 
      <AdminPage currentUser={currentUser} setCurrentUser={setCurrentUser} /> : 
      <LoginPage setCurrentUser={setCurrentUser} errorMsg={errorMsgAdmin} />} />

     </Routes>
    </div>
    </Router>
  );
}

export default App;
