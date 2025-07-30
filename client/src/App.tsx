
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import RootLayout from './components/layout/RootLayout';
import AuthLayout from './components/layout/AuthLayout';
import Login from './components/root/Login';
import OAuthCallback from './components/OAuthCallback';
import { useAuth } from './hooks/useAuth';

function App() {
  // Check authentication status on app load
  useAuth();

  return (
    <BrowserRouter >
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
