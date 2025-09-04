import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './styles/theme.css'
import './styles/neobrutalist.css'

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Components
import Layout from './components/Layout/Layout'
import NeobrutalistHomePage from './components/Home/NeobrutalistHomePage'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Onboarding from './components/Auth/Onboarding'
import Dashboard from './components/Dashboard/Dashboard'
import VoiceCapture from './components/Voice/VoiceCapture'
import Translation from './components/Translation/Translation'
import Analytics from './components/Analytics/Analytics'
import Team from './components/Team/Team'
import Offline from './components/Offline/Offline'
import MultimodalCapture from './components/DataCapture/MultimodalCapture'
import TextCapture from './components/DataCapture/TextCapture'
import LanguageSelector from './components/Localization/LanguageSelector'

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      dark: '#1d4ed8',
      light: '#3b82f6',
    },
    secondary: {
      main: '#059669',
      dark: '#047857',
      light: '#10b981',
    },
    error: {
      main: '#dc2626',
    },
    warning: {
      main: '#d97706',
    },
    success: {
      main: '#16a34a',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 0 0 1px rgba(0, 0, 0, 0.05)',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 0 0 1px rgba(0, 0, 0, 0.05)',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 0 0 1px rgba(0, 0, 0, 0.05)',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ] as any,
})

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Layout>{children}</Layout>
}

// App Routes Component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<NeobrutalistHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/voice" element={
        <ProtectedRoute>
          <VoiceCapture />
        </ProtectedRoute>
      } />
      <Route path="/multimodal" element={
        <ProtectedRoute>
          <MultimodalCapture />
        </ProtectedRoute>
      } />
      <Route path="/text" element={
        <ProtectedRoute>
          <TextCapture />
        </ProtectedRoute>
      } />
      <Route path="/translation" element={
        <ProtectedRoute>
          <Translation />
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />
      <Route path="/team" element={
        <ProtectedRoute>
          <Team />
        </ProtectedRoute>
      } />
      <Route path="/offline" element={
        <ProtectedRoute>
          <Offline />
        </ProtectedRoute>
      } />
      <Route path="/localization" element={
        <ProtectedRoute>
          <LanguageSelector />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App