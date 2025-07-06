
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import RootLayout from './components/layout/RootLayout';
import AuthLayout from './components/layout/AuthLayout';
import Login from './components/Login';



function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
