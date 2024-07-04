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
import { ForOFor } from './pages/ForOFor';
import { Billing } from './pages/Product/Billing';

function App() {
	return (
	  <Router>
		<Routes>
		  <Route path='/sign-in' element={<Login />} />
		  <Route path='/sign-up' element={<Register />} />
		  <Route path='/' element={<RootLayout />}>
			<Route path='' element={<Dashboard />} />
			<Route path='Calendar' element={<Calendar />} />
			<Route path='Product' element={<Product />} />
			<Route path='Product/Billing/:id' element={<Billing />} />
			<Route path='Clients' element={<Clients />} />
			<Route path='Management' element={<Management />} />
			<Route path='Administration' element={<Administration />} />
		  </Route>
		  <Route path='*' element={<ForOFor />} /> {/* Catch-all route for 404 outside the RootLayout */}
		</Routes>
	  </Router>
	);
  }

export default App;

