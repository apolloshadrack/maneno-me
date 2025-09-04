import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  CloudOff,
  CloudSync,
  Download,
  Upload,
  Storage,
  WifiOff,
  Wifi,
  Sync,
  CheckCircle,
  Error,
  Warning,
  Info,
  Delete,
  Edit,
  PlayArrow,
  Pause,
  Stop,
  Translate,
} from '@mui/icons-material'

interface OfflineData {
  id: string
  type: 'recording' | 'translation' | 'text'
  title: string
  language: string
  size: string
  status: 'pending' | 'synced' | 'error' | 'syncing'
  createdDate: string
  lastModified: string
  localPath?: string
}

interface SyncStatus {
  isOnline: boolean
  lastSync: string | null
  pendingItems: number
  syncedItems: number
  errorItems: number
  totalSize: string
}

export default function Offline() {
  const [offlineData, setOfflineData] = useState<OfflineData[]>([])
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: false,
    lastSync: null,
    pendingItems: 0,
    syncedItems: 0,
    errorItems: 0,
    totalSize: '0 MB',
  })
  const [selectedTab, setSelectedTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<OfflineData | null>(null)
  const [autoSync, setAutoSync] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setOfflineData([
        {
          id: '1',
          type: 'recording',
          title: 'Kiswahili Greetings',
          language: 'Kiswahili',
          size: '2.3 MB',
          status: 'pending',
          createdDate: '2024-09-03',
          lastModified: '2024-09-03T14:30:00Z',
          localPath: '/offline/recordings/kiswahili_greetings.wav',
        },
        {
          id: '2',
          type: 'translation',
          title: 'Yorùbá Proverbs Collection',
          language: 'Yorùbá',
          size: '1.8 MB',
          status: 'synced',
          createdDate: '2024-09-02',
          lastModified: '2024-09-02T16:45:00Z',
        },
        {
          id: '3',
          type: 'text',
          title: 'Hausa Folktales',
          language: 'Hausa',
          size: '0.9 MB',
          status: 'error',
          createdDate: '2024-09-01',
          lastModified: '2024-09-01T10:15:00Z',
          localPath: '/offline/text/hausa_folktales.txt',
        },
        {
          id: '4',
          type: 'recording',
          title: 'IsiZulu Numbers',
          language: 'IsiZulu',
          size: '3.1 MB',
          status: 'syncing',
          createdDate: '2024-08-30',
          lastModified: '2024-08-30T09:20:00Z',
          localPath: '/offline/recordings/isizulu_numbers.wav',
        },
        {
          id: '5',
          type: 'translation',
          title: 'Amharic Poetry',
          language: 'Amharic',
          size: '1.2 MB',
          status: 'pending',
          createdDate: '2024-08-28',
          lastModified: '2024-08-28T13:10:00Z',
        },
      ])

      setSyncStatus({
        isOnline: navigator.onLine,
        lastSync: '2024-09-03T15:30:00Z',
        pendingItems: 2,
        syncedItems: 1,
        errorItems: 1,
        totalSize: '9.3 MB',
      })

      setLoading(false)
    }, 1000)

    // Listen for online/offline events
    const handleOnline = () => setSyncStatus(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setSyncStatus(prev => ({ ...prev, isOnline: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Warning sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'synced': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'error': return <Error sx={{ color: 'error.main', fontSize: 20 }} />
      case 'syncing': return <Sync sx={{ color: 'info.main', fontSize: 20 }} />
      default: return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'synced': return 'success'
      case 'error': return 'error'
      case 'syncing': return 'info'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recording': return <PlayArrow sx={{ fontSize: 20 }} />
      case 'translation': return <Translate sx={{ fontSize: 20 }} />
      case 'text': return <Edit sx={{ fontSize: 20 }} />
      default: return <Storage sx={{ fontSize: 20 }} />
    }
  }

  const handleSync = () => {
    // Simulate sync process
    setSyncStatus(prev => ({ ...prev, isOnline: true }))
    // Update pending items to syncing
    setOfflineData(prev => prev.map(item => 
      item.status === 'pending' ? { ...item, status: 'syncing' as const } : item
    ))
    
    // Simulate sync completion after 3 seconds
    setTimeout(() => {
      setOfflineData(prev => prev.map(item => 
        item.status === 'syncing' ? { ...item, status: 'synced' as const } : item
      ))
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date().toISOString(),
        pendingItems: 0,
        syncedItems: prev.syncedItems + 2,
      }))
    }, 3000)
  }

  const handleDeleteItem = (id: string) => {
    setOfflineData(prev => prev.filter(item => item.id !== id))
  }

  const handleEditItem = (item: OfflineData) => {
    setEditingItem(item)
    setOpenDialog(true)
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
              Offline Mode
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Capture and sync data without internet connection
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
            {syncStatus.isOnline ? <Wifi sx={{ fontSize: 40 }} /> : <WifiOff sx={{ fontSize: 40 }} />}
          </Box>
        </Box>
      </Paper>

      {/* Connection Status */}
      <Alert 
        severity={syncStatus.isOnline ? 'success' : 'warning'} 
        sx={{ mb: 4 }}
        icon={syncStatus.isOnline ? <Wifi /> : <WifiOff />}
      >
        {syncStatus.isOnline ? (
          'Connected to internet - All features available'
        ) : (
          'Offline mode - Data will sync when connection is restored'
        )}
      </Alert>

      {/* Sync Status Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  {syncStatus.pendingItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Sync
                </Typography>
              </Box>
              <CloudOff sx={{ fontSize: 40, color: 'warning.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Waiting to sync
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {syncStatus.syncedItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Synced Items
                </Typography>
              </Box>
              <CloudSync sx={{ fontSize: 40, color: 'success.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Successfully synced
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                  {syncStatus.errorItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Errors
                </Typography>
              </Box>
              <Error sx={{ fontSize: 40, color: 'error.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Sync failed
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                  {syncStatus.totalSize}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Size
                </Typography>
              </Box>
              <Storage sx={{ fontSize: 40, color: 'info.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Offline storage
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Sync Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sync Controls
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                  />
                }
                label="Auto Sync"
              />
              <Button
                variant="contained"
                startIcon={<Sync />}
                onClick={handleSync}
                disabled={!syncStatus.isOnline || syncStatus.pendingItems === 0}
              >
                Sync Now
              </Button>
            </Box>
          </Box>
          
          {syncStatus.lastSync && (
            <Typography variant="body2" color="text.secondary">
              Last sync: {new Date(syncStatus.lastSync).toLocaleString()}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Offline Data" />
            <Tab label="Sync History" />
            <Tab label="Storage Settings" />
          </Tabs>
        </Box>

        <CardContent>
          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Offline Data ({offlineData.length} items)
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Language</TableCell>
                      <TableCell align="right">Size</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {offlineData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Created: {new Date(item.createdDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getTypeIcon(item.type)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {item.type}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.language} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell align="right">{item.size}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(item.status)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {item.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteItem(item.id)}
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
                Sync History
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sync completed successfully"
                    secondary="2024-09-03 15:30:00 - 3 items synced"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Error sx={{ color: 'error.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sync failed - Network error"
                    secondary="2024-09-02 14:20:00 - 1 item failed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sync completed successfully"
                    secondary="2024-09-01 09:15:00 - 2 items synced"
                  />
                </ListItem>
              </List>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Storage Settings
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Storage Usage
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Used</Typography>
                        <Typography variant="body2">9.3 MB</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={23} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Available: 30.7 MB of 40 MB
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Sync Preferences
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Sync on WiFi only"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto-sync when online"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Compress data before sync"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Offline Item
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              defaultValue={editingItem?.title || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                defaultValue={editingItem?.language || ''}
                label="Language"
              >
                <MenuItem value="Kiswahili">Kiswahili</MenuItem>
                <MenuItem value="Yorùbá">Yorùbá</MenuItem>
                <MenuItem value="Hausa">Hausa</MenuItem>
                <MenuItem value="IsiZulu">IsiZulu</MenuItem>
                <MenuItem value="Amharic">Amharic</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                defaultValue={editingItem?.type || 'recording'}
                label="Type"
              >
                <MenuItem value="recording">Recording</MenuItem>
                <MenuItem value="translation">Translation</MenuItem>
                <MenuItem value="text">Text</MenuItem>
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
