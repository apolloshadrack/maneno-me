import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Divider,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Language,
  Translate,
  CheckCircle,
  Warning,
  Info,
  Edit,
  Add,
  Delete,
  Download,
  Upload,
  Refresh,
  Settings,
  Public,
  Flag,
} from '@mui/icons-material'

interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  flag: string
  region: string
  isActive: boolean
  isDefault: boolean
  completion: number
  lastUpdated: string
  translator: string
  status: 'complete' | 'in_progress' | 'needs_review' | 'not_started'
}

interface TranslationKey {
  key: string
  value: string
  context: string
  category: string
  isTranslated: boolean
  lastModified: string
}

export default function LanguageSelector() {
  const [languages, setLanguages] = useState<LanguageConfig[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingKey, setEditingKey] = useState<TranslationKey | null>(null)
  const [loading, setLoading] = useState(true)

  const categories = [
    'navigation',
    'dashboard',
    'voice_capture',
    'translation',
    'analytics',
    'team',
    'offline',
    'common',
    'errors',
    'success',
  ]

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLanguages([
        {
          code: 'en',
          name: 'English',
          nativeName: 'English',
          flag: '🇬🇧',
          region: 'Global',
          isActive: true,
          isDefault: true,
          completion: 100,
          lastUpdated: '2024-09-03T15:30:00Z',
          translator: 'System',
          status: 'complete',
        },
        {
          code: 'sw',
          name: 'Kiswahili',
          nativeName: 'Kiswahili',
          flag: '🇹🇿',
          region: 'East Africa',
          isActive: true,
          isDefault: false,
          completion: 85,
          lastUpdated: '2024-09-02T14:20:00Z',
          translator: 'Dr. Amina Okafor',
          status: 'in_progress',
        },
        {
          code: 'yo',
          name: 'Yorùbá',
          nativeName: 'Yorùbá',
          flag: '🇳🇬',
          region: 'West Africa',
          isActive: true,
          isDefault: false,
          completion: 72,
          lastUpdated: '2024-09-01T10:15:00Z',
          translator: 'Prof. Kwame Asante',
          status: 'in_progress',
        },
        {
          code: 'zu',
          name: 'IsiZulu',
          nativeName: 'IsiZulu',
          flag: '🇿🇦',
          region: 'Southern Africa',
          isActive: true,
          isDefault: false,
          completion: 68,
          lastUpdated: '2024-08-30T09:20:00Z',
          translator: 'Sarah Mwangi',
          status: 'needs_review',
        },
        {
          code: 'ha',
          name: 'Hausa',
          nativeName: 'Hausa',
          flag: '🇳🇬',
          region: 'West Africa',
          isActive: true,
          isDefault: false,
          completion: 45,
          lastUpdated: '2024-08-28T13:10:00Z',
          translator: 'Ahmed Hassan',
          status: 'in_progress',
        },
        {
          code: 'am',
          name: 'Amharic',
          nativeName: 'አማርኛ',
          flag: '🇪🇹',
          region: 'East Africa',
          isActive: false,
          isDefault: false,
          completion: 23,
          lastUpdated: '2024-08-25T16:45:00Z',
          translator: 'Dr. Fatima Al-Zahra',
          status: 'not_started',
        },
      ])

      setTranslationKeys([
        {
          key: 'app.title',
          value: 'Maneno - African Language Platform',
          context: 'Main application title',
          category: 'common',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'nav.dashboard',
          value: 'Dashboard',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'nav.voice_capture',
          value: 'Voice Capture',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'nav.translation',
          value: 'Translation',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'nav.analytics',
          value: 'Analytics',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: false,
          lastModified: '2024-09-02T14:20:00Z',
        },
        {
          key: 'nav.team',
          value: 'Team Management',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: false,
          lastModified: '2024-09-01T10:15:00Z',
        },
        {
          key: 'nav.offline',
          value: 'Offline Mode',
          context: 'Navigation menu item',
          category: 'navigation',
          isTranslated: false,
          lastModified: '2024-08-30T09:20:00Z',
        },
        {
          key: 'dashboard.welcome',
          value: 'Welcome to Maneno',
          context: 'Dashboard welcome message',
          category: 'dashboard',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'dashboard.stats.recordings',
          value: 'Voice Recordings',
          context: 'Statistics card title',
          category: 'dashboard',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'dashboard.stats.translations',
          value: 'Translations',
          context: 'Statistics card title',
          category: 'dashboard',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'voice.record',
          value: 'Start Recording',
          context: 'Voice capture button',
          category: 'voice_capture',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'voice.stop',
          value: 'Stop Recording',
          context: 'Voice capture button',
          category: 'voice_capture',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'translation.translate',
          value: 'Translate',
          context: 'Translation button',
          category: 'translation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'translation.from',
          value: 'From',
          context: 'Language selection label',
          category: 'translation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'translation.to',
          value: 'To',
          context: 'Language selection label',
          category: 'translation',
          isTranslated: true,
          lastModified: '2024-09-03T15:30:00Z',
        },
        {
          key: 'error.network',
          value: 'Network error occurred',
          context: 'Error message',
          category: 'errors',
          isTranslated: false,
          lastModified: '2024-09-02T14:20:00Z',
        },
        {
          key: 'success.saved',
          value: 'Data saved successfully',
          context: 'Success message',
          category: 'success',
          isTranslated: false,
          lastModified: '2024-09-01T10:15:00Z',
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'in_progress': return <Refresh sx={{ color: 'info.main', fontSize: 20 }} />
      case 'needs_review': return <Warning sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'not_started': return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
      default: return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'success'
      case 'in_progress': return 'info'
      case 'needs_review': return 'warning'
      case 'not_started': return 'default'
      default: return 'default'
    }
  }

  const handleLanguageToggle = (code: string) => {
    setLanguages(prev => prev.map(lang => 
      lang.code === code ? { ...lang, isActive: !lang.isActive } : lang
    ))
  }

  const handleSetDefault = (code: string) => {
    setLanguages(prev => prev.map(lang => ({
      ...lang,
      isDefault: lang.code === code
    })))
  }

  const handleEditTranslation = (key: TranslationKey) => {
    setEditingKey(key)
    setOpenDialog(true)
  }

  const handleSaveTranslation = () => {
    if (!editingKey) return

    setTranslationKeys(prev => prev.map(key => 
      key.key === editingKey.key ? { ...key, isTranslated: true, lastModified: new Date().toISOString() } : key
    ))

    setOpenDialog(false)
    setEditingKey(null)
  }

  const filteredKeys = translationKeys.filter(key => 
    selectedLanguage === 'en' || !key.isTranslated
  )

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography>Loading language data...</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Language Localization
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage interface translations for African languages
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Language sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Language Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {languages.map((lang) => (
          <Grid item xs={12} sm={6} md={4} key={lang.code}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedLanguage === lang.code ? 2 : 1,
                borderColor: selectedLanguage === lang.code ? 'primary.main' : 'divider',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => setSelectedLanguage(lang.code)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {lang.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lang.nativeName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(lang.status)}
                    {lang.isDefault && (
                      <Chip label="Default" size="small" color="primary" />
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Completion
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {lang.completion}%
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: 8, 
                      bgcolor: 'grey.200', 
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: `${lang.completion}%`, 
                        height: '100%', 
                        bgcolor: lang.completion === 100 ? 'success.main' : 'primary.main',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {lang.region}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title={lang.isActive ? 'Disable' : 'Enable'}>
                      <Switch
                        checked={lang.isActive}
                        onChange={() => handleLanguageToggle(lang.code)}
                        size="small"
                      />
                    </Tooltip>
                    {!lang.isDefault && (
                      <Tooltip title="Set as Default">
                        <IconButton
                          size="small"
                          onClick={() => handleSetDefault(lang.code)}
                        >
                          <Flag />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Translator: {lang.translator}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Translation Keys */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Translation Keys
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" startIcon={<Download />}>
                Export
              </Button>
              <Button variant="outlined" startIcon={<Upload />}>
                Import
              </Button>
            </Box>
          </Box>

          {selectedLanguage !== 'en' && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Showing untranslated keys for {languages.find(l => l.code === selectedLanguage)?.name}
            </Alert>
          )}

          <List>
            {filteredKeys.map((key) => (
              <ListItem key={key.key} sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <Translate sx={{ color: key.isTranslated ? 'success.main' : 'warning.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {key.key}
                      </Typography>
                      <Chip 
                        label={key.category} 
                        size="small" 
                        variant="outlined"
                      />
                      {key.isTranslated && (
                        <Chip 
                          label="Translated" 
                          size="small" 
                          color="success"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {key.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {key.context} • Last modified: {new Date(key.lastModified).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    onClick={() => handleEditTranslation(key)}
                  >
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Edit Translation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Translation
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Translation Key"
              fullWidth
              value={editingKey?.key || ''}
              disabled
            />
            <TextField
              label="English Value"
              fullWidth
              value={editingKey?.value || ''}
              disabled
            />
            <TextField
              label={`Translation (${languages.find(l => l.code === selectedLanguage)?.name})`}
              fullWidth
              multiline
              rows={3}
              placeholder="Enter translation here..."
            />
            <TextField
              label="Context"
              fullWidth
              value={editingKey?.context || ''}
              disabled
            />
            <TextField
              label="Category"
              fullWidth
              value={editingKey?.category || ''}
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTranslation}>
            Save Translation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
