import React from 'react';
import Test from './test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/test'  element={<Test />}/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
