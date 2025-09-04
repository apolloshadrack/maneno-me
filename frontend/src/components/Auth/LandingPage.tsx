import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Chip,
  Paper,
  useTheme,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Login,
  PersonAdd,
  Language,
  Translate,
  Mic,
  Analytics,
  People,
  OfflinePin,
  CloudUpload,
  TextFields,
} from '@mui/icons-material'

interface LandingPageProps {
  onLogin: (email: string, password: string) => void
  onSignup: (email: string, password: string, name: string) => void
  error?: string
  loading?: boolean
}

const LandingPage: React.FC<LandingPageProps> = ({
  onLogin,
  onSignup,
  error,
  loading = false,
}) => {
  const theme = useTheme()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isLogin) {
      onLogin(formData.email, formData.password)
    } else {
      onSignup(formData.email, formData.password, formData.name)
    }
  }

  const features = [
    {
      icon: <Language sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: '50+ African Languages',
      description: 'Support for major Kenyan and African languages',
    },
    {
      icon: <Mic sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Voice Capture',
      description: 'Record and transcribe audio in native languages',
    },
    {
      icon: <Translate sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'AI Translation',
      description: 'Advanced machine learning translation models',
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Data Analytics',
      description: 'Comprehensive insights and progress tracking',
    },
    {
      icon: <People sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Community',
      description: 'Collaborate with linguists and researchers',
    },
    {
      icon: <OfflinePin sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Offline Mode',
      description: 'Work without internet connection',
    },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 2,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Maneno
            </Typography>
            <Chip
              label="Preserving African Languages"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ py: 4 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Preserve & Translate
                <br />
                African Languages
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                Join the mission to preserve and digitize indigenous African languages
                through AI-powered translation and community collaboration.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Language />}
                  label="50+ Languages"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<Mic />}
                  label="Voice Recording"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<Translate />}
                  label="AI Translation"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Grid>

          {/* Auth Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 400, mx: 'auto' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {isLogin ? 'Welcome Back' : 'Join Maneno'}
                  </Typography>
                  <Typography color="text.secondary">
                    {isLogin
                      ? 'Sign in to continue preserving African languages'
                      : 'Create your account to start contributing'}
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      margin="normal"
                      required={!isLogin}
                    />
                  )}
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    margin="normal"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    startIcon={isLogin ? <Login /> : <PersonAdd />}
                  >
                    {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  </Typography>
                  <Button
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{ mt: 1 }}
                    color="primary"
                  >
                    {isLogin ? 'Sign up here' : 'Sign in here'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Platform Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 8, py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Maneno - Preserving African Languages Through Technology
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default LandingPage
