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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Alert,
  Paper,
  Chip,
  Tabs,
  Tab,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  Mic,
  MicOff,
  PlayArrow,
  Download,
  CheckCircle,
  Error,
  AccessTime,
  Pause,
  Stop,
  Upload,
  CloudUpload,
  Language,
  VolumeUp,
  Settings,
} from '@mui/icons-material'

interface Recording {
  id: string
  language: string
  text: string
  audioBlob: Blob
  duration: number
  timestamp: Date
  status: 'recording' | 'processing' | 'completed' | 'error'
  quality: 'high' | 'medium' | 'low'
  format: 'wav' | 'mp3' | 'webm'
  sampleRate: number
  channels: number
  tags: string[]
  metadata: {
    speaker: string
    context: string
    topic: string
    region: string
  }
}

export default function VoiceCapture() {
  const [isRecording, setIsRecording] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('sw')
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [transcription, setTranscription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [recordingSettings, setRecordingSettings] = useState({
    quality: 'high' as 'high' | 'medium' | 'low',
    format: 'wav' as 'wav' | 'mp3' | 'webm',
    sampleRate: 44100,
    channels: 1,
    autoTranscribe: true,
    noiseReduction: true,
  })
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const languages = [
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿', region: 'East Africa' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬', region: 'West Africa' },
    { code: 'zu', name: 'IsiZulu', flag: '🇿🇦', region: 'Southern Africa' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', region: 'West Africa' },
    { code: 'am', name: 'Amharic', flag: '🇪🇹', region: 'East Africa' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', region: 'West Africa' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', region: 'West Africa' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', region: 'North Africa' },
  ]

  const predefinedTags = [
    'greeting', 'conversation', 'story', 'song', 'poetry', 'proverb',
    'education', 'business', 'family', 'food', 'travel', 'religion'
  ]

  const startRecording = async () => {
    try {
      const constraints = {
        audio: {
          sampleRate: recordingSettings.sampleRate,
          channelCount: recordingSettings.channels,
          echoCancellation: true,
          noiseSuppression: recordingSettings.noiseReduction,
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: `audio/${recordingSettings.format}`
      })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { 
          type: `audio/${recordingSettings.format}` 
        })
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          language: selectedLanguage,
          text: '',
          audioBlob,
          duration: recordingDuration,
          timestamp: new Date(),
          status: 'processing',
          quality: recordingSettings.quality,
          format: recordingSettings.format,
          sampleRate: recordingSettings.sampleRate,
          channels: recordingSettings.channels,
          tags: [],
          metadata: {
            speaker: 'Unknown',
            context: 'Voice Recording',
            topic: 'General',
            region: languages.find(l => l.code === selectedLanguage)?.region || 'Unknown',
          }
        }

        setRecordings(prev => [newRecording, ...prev])
        setIsProcessing(true)

        // Simulate transcription processing
        setTimeout(() => {
          setTranscription('Hujambo, jina langu ni...')
          setIsProcessing(false)
          setRecordings(prev => prev.map(r => 
            r.id === newRecording.id 
              ? { ...r, text: 'Hujambo, jina langu ni...', status: 'completed' }
              : r
          ))
        }, 2000)
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
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const playRecording = (recording: Recording) => {
    if (audioRef.current) {
      const audioUrl = URL.createObjectURL(recording.audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
    }
  }

  const downloadRecording = (recording: Recording) => {
    const url = URL.createObjectURL(recording.audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recording-${recording.id}.wav`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'processing':
        return <AccessTime sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'error':
        return <Error sx={{ color: 'error.main', fontSize: 20 }} />
      default:
        return <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
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
              Voice Capture Studio
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Record, transcribe, and preserve African languages
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
            <Mic sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Recording Interface */}
        <Card>
          <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Record New Audio
              </Typography>
              
              {/* Language Selection */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Language</InputLabel>
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Select Language"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Recording Controls */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                {!isRecording ? (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Mic />}
                    onClick={startRecording}
                    sx={{ px: 4, py: 2 }}
                  >
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<MicOff />}
                    onClick={stopRecording}
                    sx={{ px: 4, py: 2 }}
                  >
                    Stop Recording
                  </Button>
                )}
              </Box>

              {/* Recording Status */}
              {isRecording && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'error.main',
                        animation: 'pulse 1.5s infinite',
                      }}
                    />
                    Recording in progress...
                  </Box>
                </Alert>
              )}

              {isProcessing && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress sx={{ flex: 1 }} />
                    Processing transcription...
                  </Box>
                </Alert>
              )}

              {/* Transcription Display */}
              {transcription && (
                <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Transcription
                  </Typography>
                  <Typography variant="body2">{transcription}</Typography>
                </Paper>
              )}
            </CardContent>
          </Card>

        {/* Recent Recordings */}
        <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Recordings
              </Typography>
              
              {recordings.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Mic sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary">
                    No recordings yet. Start recording to see them here.
                  </Typography>
                </Box>
              ) : (
                <List>
                  {recordings.map((recording) => (
                    <ListItem
                      key={recording.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {languages.find(l => l.code === recording.language)?.name}
                            </Typography>
                            {getStatusIcon(recording.status)}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {recording.timestamp.toLocaleTimeString()}
                            </Typography>
                            {recording.text && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {recording.text}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => playRecording(recording)}
                          >
                            <PlayArrow />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => downloadRecording(recording)}
                          >
                            <Download />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
      </Box>

      {/* Audio Element */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  )
}