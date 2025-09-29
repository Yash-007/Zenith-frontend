import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, fetchCurrentUser } from './store/slices/authSlice'
import Layout from './components/layout/Layout'
import HomePage from './pages/home'
import ChallengesPage from './pages/challenges'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // Fetch user data on app load if authenticated
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/challenges" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/challenges" />} />
        
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        
        <Route path="/challenges" element={
          <ProtectedRoute>
            <Layout>
              <ChallengesPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
