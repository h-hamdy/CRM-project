import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { RootLayout } from './pages/RootLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Calendar } from 'antd';
import { Product } from './pages/Product/Product';
import { Clients } from './pages/Clients/Clients';
import { Management } from './pages/Management/Management';
import { Administration } from './pages/Administration/Administration';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
			<Route path='/' element={<RootLayout />} >
				<Route path='Dashboard' element={<Dashboard/>}></Route>
				<Route path='Calendar' element={<Calendar/>}></Route>
				<Route path='Product' element={<Product/>}></Route>
				<Route path='Clients' element={<Clients/>}></Route>
				<Route path='Management' element={<Management/>}></Route>
				<Route path='Administration' element={<Administration/>}></Route>
			</Route>
        </Routes>
      </Router>
  );
}

export default App;

