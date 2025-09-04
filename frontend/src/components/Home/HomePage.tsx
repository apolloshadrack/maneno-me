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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  ArrowForward,
  CheckCircle,
  Star,
  PlayArrow,
  ExpandMore,
  School,
  Security,
  Speed,
  Public,
} from '@mui/icons-material'

interface HomePageProps {
  onLogin: (email: string, password: string) => void
  onSignup: (email: string, password: string, name: string) => void
  error?: string
  loading?: boolean
}

const HomePage: React.FC<HomePageProps> = ({
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

  const stats = [
    { number: '50+', label: 'African Languages', icon: <Language /> },
    { number: '10K+', label: 'Voice Recordings', icon: <Mic /> },
    { number: '25K+', label: 'Translations', icon: <Translate /> },
    { number: '1.2K+', label: 'Contributors', icon: <People /> },
  ]

  const features = [
    {
      icon: <Language sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: '50+ African Languages',
      description: 'Comprehensive support for major Kenyan and African languages with cultural context preservation.',
      benefits: ['Swahili', 'Yoruba', 'Zulu', 'Hausa', 'Amharic', 'More...'],
    },
    {
      icon: <Mic sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Voice Capture',
      description: 'Record native speakers with high-quality audio processing and automatic transcription.',
      benefits: ['Real-time transcription', 'Noise reduction', 'Multiple formats', 'Offline recording'],
    },
    {
      icon: <Translate sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'AI Translation',
      description: 'Advanced neural machine translation models trained specifically on African languages.',
      benefits: ['Context-aware', 'Cultural nuance', 'Bidirectional', 'Quality scoring'],
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Data Analytics',
      description: 'Comprehensive insights into language usage, translation quality, and community engagement.',
      benefits: ['Usage statistics', 'Quality metrics', 'Progress tracking', 'Export data'],
    },
    {
      icon: <People sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Community',
      description: 'Collaborate with linguists, researchers, and native speakers from across Africa.',
      benefits: ['Expert network', 'Peer review', 'Knowledge sharing', 'Mentorship'],
    },
    {
      icon: <OfflinePin sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Offline Mode',
      description: 'Work without internet connection and sync when connectivity is restored.',
      benefits: ['Offline recording', 'Local storage', 'Sync on demand', 'Conflict resolution'],
    },
  ]

  const testimonials = [
    {
      name: 'Dr. Amina Okafor',
      role: 'Linguistics Professor, University of Nairobi',
      avatar: 'https://ui-avatars.com/api/?name=Amina+Okafor&background=2563eb&color=fff',
      content: 'Maneno has revolutionized how we preserve and study African languages. The AI translation quality is remarkable.',
      rating: 5,
    },
    {
      name: 'Kwame Asante',
      role: 'Community Leader, Ghana',
      avatar: 'https://ui-avatars.com/api/?name=Kwame+Asante&background=059669&color=fff',
      content: 'Finally, a platform that respects our cultural heritage while embracing modern technology. Truly transformative.',
      rating: 5,
    },
    {
      name: 'Fatima Hassan',
      role: 'Cultural Anthropologist, Nigeria',
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Hassan&background=dc2626&color=fff',
      content: 'The community-driven approach ensures our languages are preserved by the people who know them best.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'How accurate are the AI translations?',
      answer: 'Our AI models achieve 85-95% accuracy depending on the language pair and context. We continuously improve through community feedback and expert validation.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we use enterprise-grade security measures and give communities full control over their linguistic data. Your privacy and cultural sovereignty are our top priorities.',
    },
    {
      question: 'Can I contribute without technical expertise?',
      answer: 'Absolutely! You can contribute by recording voice samples, providing translations, or simply sharing your language knowledge. Our platform is designed for everyone.',
    },
    {
      question: 'How does offline mode work?',
      answer: 'You can record audio, add text, and work on translations offline. When internet connectivity is restored, your work automatically syncs with the platform.',
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Language sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Maneno
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" href="#about">
                About
              </Button>
              <Button color="inherit" href="#features">
                Features
              </Button>
              <Button color="inherit" href="#contact">
                Contact
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 12,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Preserve & Translate
                <br />
                African Languages
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                Join the mission to preserve and digitize indigenous African languages 
                through AI-powered translation and community collaboration.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Chip
                  icon={<Language />}
                  label="50+ Languages"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<Mic />}
                  label="Voice Recording"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<Translate />}
                  label="AI Translation"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PersonAdd />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 500, mx: 'auto' }}>
                <CardContent sx={{ p: 4 }}>
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
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Why Choose Maneno?
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We combine cutting-edge AI technology with community-driven approaches 
              to create the most comprehensive African language preservation platform.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          bgcolor: 'primary.50',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <Chip
                          key={benefitIndex}
                          label={benefit}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              What Our Community Says
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Join thousands of contributors who are already making a difference
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.7 }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Everything you need to know about Maneno
            </Typography>
          </Box>

          <Box>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Ready to Make a Difference?
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Join our community of language preservationists and help us build 
              a more connected, multilingual world.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PersonAdd />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                  py: 1.5,
                  px: 4,
                }}
              >
                Start Contributing Today
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Language />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  py: 1.5,
                  px: 4,
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Language sx={{ fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Maneno
                </Typography>
              </Box>
              <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
                Preserving African languages through technology, community, and innovation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Platform
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Voice Capture" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Translation" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Analytics" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Community" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Support
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Documentation" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Help Center" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Contact Us" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Status" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Community
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Contributors" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Partners" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Research" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Events" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Legal
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Terms of Service" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Data Policy" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Cookies" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: 'grey.700' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="grey.400">
              © 2024 Maneno - Preserving African Languages Through Technology
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
