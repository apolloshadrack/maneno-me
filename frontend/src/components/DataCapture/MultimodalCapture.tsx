import { useState, useRef } from 'react'
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
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  Mic,
  Videocam,
  Image,
  TextFields,
  Upload,
  PlayArrow,
  Pause,
  Stop,
  Delete,
  Edit,
  CheckCircle,
  Error,
  Warning,
  Info,
  CloudUpload,
  Download,
  Share,
} from '@mui/icons-material'

interface MultimodalData {
  id: string
  type: 'voice' | 'video' | 'image' | 'text' | 'combined'
  title: string
  language: string
  description: string
  filePath?: string
  duration?: number
  size: string
  status: 'recording' | 'processing' | 'completed' | 'error'
  createdAt: string
  tags: string[]
  metadata: {
    quality: 'high' | 'medium' | 'low'
    format: string
    resolution?: string
    sampleRate?: number
  }
}

export default function MultimodalCapture() {
  const [capturedData, setCapturedData] = useState<MultimodalData[]>([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState<'voice' | 'video'>('voice')
  const [selectedLanguage, setSelectedLanguage] = useState('sw')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MultimodalData | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const languages = [
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'zu', name: 'IsiZulu', flag: '🇿🇦' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'am', name: 'Amharic', flag: '🇪🇹' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  ]

  const dataTypes = [
    { type: 'voice', label: 'Voice Recording', icon: Mic, color: 'primary' },
    { type: 'video', label: 'Video Recording', icon: Videocam, color: 'secondary' },
    { type: 'image', label: 'Image Capture', icon: Image, color: 'success' },
    { type: 'text', label: 'Text Input', icon: TextFields, color: 'info' },
    { type: 'combined', label: 'Multimodal', icon: CloudUpload, color: 'warning' },
  ]

  const startRecording = async () => {
    try {
      const constraints = recordingType === 'video' 
        ? { video: true, audio: true }
        : { audio: true }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: recordingType === 'video' ? 'video/webm' : 'audio/webm'
      })
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: recordingType === 'video' ? 'video/webm' : 'audio/webm' 
        })
        
        const newData: MultimodalData = {
          id: Date.now().toString(),
          type: recordingType,
          title: `${recordingType === 'video' ? 'Video' : 'Voice'} Recording`,
          language: selectedLanguage,
          description: `Recorded in ${languages.find(l => l.code === selectedLanguage)?.name}`,
          size: `${(blob.size / 1024 / 1024).toFixed(2)} MB`,
          status: 'processing',
          createdAt: new Date().toISOString(),
          tags: [],
          metadata: {
            quality: 'high',
            format: recordingType === 'video' ? 'webm' : 'webm',
            resolution: recordingType === 'video' ? '1920x1080' : undefined,
            sampleRate: 44100,
          }
        }

        setCapturedData(prev => [newData, ...prev])
        
        // Simulate processing
        setTimeout(() => {
          setCapturedData(prev => prev.map(item => 
            item.id === newData.id ? { ...item, status: 'completed' } : item
          ))
        }, 3000)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingStartTime(Date.now())
      
      // Start duration counter
      intervalRef.current = setInterval(() => {
        if (recordingStartTime) {
          setRecordingDuration(Math.floor((Date.now() - recordingStartTime) / 1000))
        }
      }, 1000)

    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingDuration(0)
      setRecordingStartTime(null)
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recording': return <Mic sx={{ color: 'error.main', fontSize: 20 }} />
      case 'processing': return <LinearProgress sx={{ width: 20, height: 20 }} />
      case 'completed': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'error': return <Error sx={{ color: 'error.main', fontSize: 20 }} />
      default: return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recording': return 'error'
      case 'processing': return 'info'
      case 'completed': return 'success'
      case 'error': return 'error'
      default: return 'default'
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Multimodal Data Capture
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Capture voice, video, images, and text in African languages
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CloudUpload sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Recording Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Capture New Data
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={recordingType}
                  onChange={(e) => setRecordingType(e.target.value as 'voice' | 'video')}
                  label="Data Type"
                >
                  <MenuItem value="voice">Voice Recording</MenuItem>
                  <MenuItem value="video">Video Recording</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Language"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {isRecording && (
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                      {formatDuration(recordingDuration)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recording in progress...
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {!isRecording ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Mic />}
                      onClick={startRecording}
                      sx={{ minWidth: 150 }}
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      startIcon={<Stop />}
                      onClick={stopRecording}
                      sx={{ minWidth: 150 }}
                    >
                      Stop Recording
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Data Types Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Supported Data Types
          </Typography>
          <Grid container spacing={2}>
            {dataTypes.map((dataType) => {
              const Icon = dataType.icon
              return (
                <Grid item xs={12} sm={6} md={2.4} key={dataType.type}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      textAlign: 'center', 
                      p: 2, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Icon sx={{ fontSize: 40, color: `${dataType.color}.main`, mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {dataType.label}
                    </Typography>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Captured Data */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="All Data" />
            <Tab label="Voice Recordings" />
            <Tab label="Video Recordings" />
            <Tab label="Images" />
            <Tab label="Text Data" />
          </Tabs>
        </Box>

        <CardContent>
          {selectedTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  All Captured Data ({capturedData.length})
                </Typography>
                <Button variant="outlined" startIcon={<Download />}>
                  Export All
                </Button>
              </Box>

              {capturedData.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CloudUpload sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No data captured yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start recording to capture voice, video, or text data
                  </Typography>
                </Box>
              ) : (
                <List>
                  {capturedData.map((item) => (
                    <ListItem key={item.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getStatusIcon(item.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {item.title}
                            </Typography>
                            <Chip 
                              label={item.type} 
                              size="small" 
                              color={getStatusColor(item.status) as any}
                            />
                            <Chip 
                              label={languages.find(l => l.code === item.language)?.name} 
                              size="small" 
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                Size: {item.size}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Created: {new Date(item.createdAt).toLocaleString()}
                              </Typography>
                              {item.metadata.quality && (
                                <Typography variant="caption" color="text.secondary">
                                  Quality: {item.metadata.quality}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={() => setEditingItem(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}

          {/* Other tabs would show filtered data */}
          {selectedTab > 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Filtered view coming soon
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Captured Data
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              defaultValue={editingItem?.title || ''}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              defaultValue={editingItem?.description || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                defaultValue={editingItem?.language || 'sw'}
                label="Language"
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Box>
                  </MenuItem>
                ))}
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
