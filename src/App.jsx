import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, fetchCurrentUser } from './store/slices/authSlice'
import Layout from './components/layout/Layout'
import HomePage from './pages/home'
import ChallengesPage from './pages/challenges'
import ChallengeDetailPage from './pages/challenges/[id]'
import CustomSubmissionPage from './pages/submissions/custom'
import SubmissionDetailPage from './pages/submissions/[id]'
import ProfilePage from './pages/profile'
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
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 5000,
            style: {
              background: '#E8F5E9',
              color: '#1B5E20',
              border: '1px solid #A5D6A7'
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#FFEBEE',
              color: '#B71C1C',
              border: '1px solid #FFCDD2'
            },
          },
        }}
      />
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
        
        <Route path="/challenges/:id" element={
          <ProtectedRoute>
            <Layout>
              <ChallengeDetailPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/submissions/custom" element={
          <ProtectedRoute>
            <Layout>
              <CustomSubmissionPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/submissions/:id" element={
          <ProtectedRoute>
            <Layout>
              <SubmissionDetailPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
