import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  Translate,
  SwapHoriz,
  PlayArrow,
  Pause,
  Stop,
  Download,
  Upload,
  History,
  Star,
  StarBorder,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Error,
  Warning,
  Info,
  Language,
  Mic,
  TextFields,
  AutoAwesome,
} from '@mui/icons-material'

interface Translation {
  id: string
  sourceText: string
  targetText: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
  status: 'draft' | 'reviewed' | 'approved' | 'rejected'
  createdDate: string
  lastModified: string
  isFavorite: boolean
  tags: string[]
}

interface LanguagePair {
  source: string
  target: string
  isActive: boolean
  model: string
  accuracy: number
}

export default function Translation() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [languagePairs, setLanguagePairs] = useState<LanguagePair[]>([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null)
  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('sw')
  const [isTranslating, setIsTranslating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setTranslations([
        {
          id: '1',
          sourceText: 'Hello, how are you?',
          targetText: 'Hujambo, habari yako?',
          sourceLanguage: 'en',
          targetLanguage: 'sw',
          confidence: 95,
          status: 'approved',
          createdDate: '2024-09-03',
          lastModified: '2024-09-03T14:30:00Z',
          isFavorite: true,
          tags: ['greeting', 'common'],
        },
        {
          id: '2',
          sourceText: 'Good morning',
          targetText: 'Habari za asubuhi',
          sourceLanguage: 'en',
          targetLanguage: 'sw',
          confidence: 98,
          status: 'reviewed',
          createdDate: '2024-09-02',
          lastModified: '2024-09-02T16:45:00Z',
          isFavorite: false,
          tags: ['greeting', 'time'],
        },
        {
          id: '3',
          sourceText: 'Thank you very much',
          targetText: 'Asante sana',
          sourceLanguage: 'en',
          targetLanguage: 'sw',
          confidence: 92,
          status: 'draft',
          createdDate: '2024-09-01',
          lastModified: '2024-09-01T10:15:00Z',
          isFavorite: true,
          tags: ['gratitude', 'polite'],
        },
        {
          id: '4',
          sourceText: 'Where is the market?',
          targetText: 'Soko liko wapi?',
          sourceLanguage: 'en',
          targetLanguage: 'sw',
          confidence: 88,
          status: 'rejected',
          createdDate: '2024-08-30',
          lastModified: '2024-08-30T09:20:00Z',
          isFavorite: false,
          tags: ['question', 'location'],
        },
      ])

      setLanguagePairs([
        { source: 'English', target: 'Kiswahili', isActive: true, model: 'GPT-4', accuracy: 95 },
        { source: 'English', target: 'Yorùbá', isActive: true, model: 'GPT-4', accuracy: 92 },
        { source: 'English', target: 'Hausa', isActive: true, model: 'GPT-4', accuracy: 89 },
        { source: 'Kiswahili', target: 'English', isActive: false, model: 'GPT-3.5', accuracy: 87 },
        { source: 'Yorùbá', target: 'English', isActive: false, model: 'GPT-3.5', accuracy: 85 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'reviewed': return <CheckCircle sx={{ color: 'info.main', fontSize: 20 }} />
      case 'approved': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'rejected': return <Error sx={{ color: 'error.main', fontSize: 20 }} />
      default: return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'warning'
      case 'reviewed': return 'info'
      case 'approved': return 'success'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)
    
    // Simulate translation API call
    setTimeout(() => {
      const newTranslation: Translation = {
        id: Date.now().toString(),
        sourceText,
        targetText: `[Translated: ${sourceText}]`,
        sourceLanguage,
        targetLanguage,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString(),
        isFavorite: false,
        tags: [],
      }
      
      setTranslations(prev => [newTranslation, ...prev])
      setTargetText(newTranslation.targetText)
      setIsTranslating(false)
    }, 2000)
  }

  const handleSwapLanguages = () => {
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    
    const tempText = sourceText
    setSourceText(targetText)
    setTargetText(tempText)
  }

  const handleToggleFavorite = (id: string) => {
    setTranslations(prev => prev.map(t => 
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ))
  }

  const handleEditTranslation = (translation: Translation) => {
    setEditingTranslation(translation)
    setOpenDialog(true)
  }

  const handleDeleteTranslation = (id: string) => {
    setTranslations(prev => prev.filter(t => t.id !== id))
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <LinearProgress sx={{ width: '100%' }} />
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Translation Interface
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Advanced translation tools and workflows
            </Typography>
          </Box>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Translate sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Paper>

      {/* Translation Interface */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Translate Text
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Source Language */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>From</InputLabel>
                  <Select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    label="From"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="sw">Kiswahili</MenuItem>
                    <MenuItem value="yo">Yorùbá</MenuItem>
                    <MenuItem value="ha">Hausa</MenuItem>
                    <MenuItem value="zu">IsiZulu</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={handleSwapLanguages} color="primary">
                  <SwapHoriz />
                </IconButton>
              </Box>
              <TextField
                multiline
                rows={6}
                fullWidth
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                variant="outlined"
              />
            </Box>

            {/* Target Language */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>To</InputLabel>
                  <Select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    label="To"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="sw">Kiswahili</MenuItem>
                    <MenuItem value="yo">Yorùbá</MenuItem>
                    <MenuItem value="ha">Hausa</MenuItem>
                    <MenuItem value="zu">IsiZulu</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  startIcon={isTranslating ? <LinearProgress /> : <AutoAwesome />}
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isTranslating}
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </Button>
              </Box>
              <TextField
                multiline
                rows={6}
                fullWidth
                placeholder="Translation will appear here..."
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                variant="outlined"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Translation History" />
            <Tab label="Language Pairs" />
            <Tab label="Quality Control" />
          </Tabs>
        </Box>

        <CardContent>
          {selectedTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Translation History ({translations.length})
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                >
                  Export
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Source Text</TableCell>
                      <TableCell>Translation</TableCell>
                      <TableCell>Languages</TableCell>
                      <TableCell align="center">Confidence</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {translations.map((translation) => (
                      <TableRow key={translation.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {translation.sourceText}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {translation.targetText}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            <Chip label={translation.sourceLanguage.toUpperCase()} size="small" variant="outlined" />
                            <Chip label={translation.targetLanguage.toUpperCase()} size="small" variant="outlined" />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={translation.confidence}
                              sx={{ width: 60, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="caption">
                              {translation.confidence}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(translation.status)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {translation.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleToggleFavorite(translation.id)}
                            >
                              {translation.isFavorite ? <Star sx={{ color: 'warning.main' }} /> : <StarBorder />}
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleEditTranslation(translation)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteTranslation(translation.id)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Language Pairs
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                {languagePairs.map((pair, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {pair.source} → {pair.target}
                        </Typography>
                        <Switch
                          checked={pair.isActive}
                          onChange={(e) => {
                            setLanguagePairs(prev => prev.map((p, i) => 
                              i === index ? { ...p, isActive: e.target.checked } : p
                            ))
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Model
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {pair.model}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Accuracy
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {pair.accuracy}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quality Control
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Translation Quality Metrics
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Average Confidence</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>91%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Human Review Rate</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>23%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Approval Rate</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>87%</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Quality Settings
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto-review high confidence translations"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Flag low confidence translations"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Require human review for new language pairs"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Translation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Translation
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Source Text"
              fullWidth
              multiline
              rows={3}
              defaultValue={editingTranslation?.sourceText || ''}
            />
            <TextField
              label="Translation"
              fullWidth
              multiline
              rows={3}
              defaultValue={editingTranslation?.targetText || ''}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Source Language</InputLabel>
                <Select
                  defaultValue={editingTranslation?.sourceLanguage || 'en'}
                  label="Source Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="sw">Kiswahili</MenuItem>
                  <MenuItem value="yo">Yorùbá</MenuItem>
                  <MenuItem value="ha">Hausa</MenuItem>
                  <MenuItem value="zu">IsiZulu</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Target Language</InputLabel>
                <Select
                  defaultValue={editingTranslation?.targetLanguage || 'sw'}
                  label="Target Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="sw">Kiswahili</MenuItem>
                  <MenuItem value="yo">Yorùbá</MenuItem>
                  <MenuItem value="ha">Hausa</MenuItem>
                  <MenuItem value="zu">IsiZulu</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={editingTranslation?.status || 'draft'}
                label="Status"
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="reviewed">Reviewed</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
