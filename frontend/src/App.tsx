import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;

