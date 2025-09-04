import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  TextFields,
  Save,
  Edit,
  Delete,
  Download,
  Upload,
  Language,
  CheckCircle,
  Error,
  Warning,
  Info,
  Add,
  Search,
  FilterList,
  Sort,
  CloudUpload,
  History,
  Bookmark,
} from '@mui/icons-material'

interface TextData {
  id: string
  title: string
  content: string
  language: string
  category: string
  tags: string[]
  status: 'draft' | 'reviewed' | 'approved' | 'published'
  createdAt: string
  lastModified: string
  wordCount: number
  characterCount: number
  isFavorite: boolean
  metadata: {
    source: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    topic: string
    region: string
  }
}

interface TextCategory {
  id: string
  name: string
  description: string
  color: string
  count: number
}

export default function TextCapture() {
  const [textData, setTextData] = useState<TextData[]>([])
  const [categories, setCategories] = useState<TextCategory[]>([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<TextData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [loading, setLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'sw',
    category: '',
    tags: [] as string[],
    metadata: {
      source: '',
      difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
      topic: '',
      region: '',
    }
  })

  const languages = [
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'zu', name: 'IsiZulu', flag: '🇿🇦' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'am', name: 'Amharic', flag: '🇪🇹' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
  ]

  const predefinedTags = [
    'greeting', 'family', 'food', 'travel', 'business', 'education',
    'health', 'religion', 'culture', 'history', 'nature', 'technology'
  ]

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setTextData([
        {
          id: '1',
          title: 'Kiswahili Greetings',
          content: 'Hujambo! Habari yako? Mimi ni mzuri, asante. Na wewe je?',
          language: 'sw',
          category: 'greetings',
          tags: ['greeting', 'basic', 'conversation'],
          status: 'approved',
          createdAt: '2024-09-03T10:00:00Z',
          lastModified: '2024-09-03T14:30:00Z',
          wordCount: 12,
          characterCount: 65,
          isFavorite: true,
          metadata: {
            source: 'Community Contribution',
            difficulty: 'beginner',
            topic: 'Social Interaction',
            region: 'East Africa',
          }
        },
        {
          id: '2',
          title: 'Yorùbá Proverbs Collection',
          content: 'Ìwà lẹwà, ẹni tí ó ní ìwà tó dára, ó ní ẹwà tó dára. (Character is beauty, whoever has good character has good beauty)',
          language: 'yo',
          category: 'proverbs',
          tags: ['proverb', 'wisdom', 'culture'],
          status: 'reviewed',
          createdAt: '2024-09-02T15:20:00Z',
          lastModified: '2024-09-02T16:45:00Z',
          wordCount: 25,
          characterCount: 120,
          isFavorite: false,
          metadata: {
            source: 'Elder Interview',
            difficulty: 'intermediate',
            topic: 'Cultural Wisdom',
            region: 'West Africa',
          }
        },
        {
          id: '3',
          title: 'Hausa Market Vocabulary',
          content: 'Ina kasuwa? (Where is the market?) Kasuwa tana nan. (The market is here) Nawa ne farashin? (What is the price?)',
          language: 'ha',
          category: 'vocabulary',
          tags: ['market', 'shopping', 'vocabulary'],
          status: 'draft',
          createdAt: '2024-09-01T09:15:00Z',
          lastModified: '2024-09-01T10:15:00Z',
          wordCount: 18,
          characterCount: 95,
          isFavorite: true,
          metadata: {
            source: 'Field Research',
            difficulty: 'beginner',
            topic: 'Commerce',
            region: 'West Africa',
          }
        },
      ])

      setCategories([
        { id: 'greetings', name: 'Greetings', description: 'Common greetings and salutations', color: 'primary', count: 15 },
        { id: 'proverbs', name: 'Proverbs', description: 'Traditional sayings and wisdom', color: 'secondary', count: 8 },
        { id: 'vocabulary', name: 'Vocabulary', description: 'Word lists and definitions', color: 'success', count: 23 },
        { id: 'stories', name: 'Stories', description: 'Folktales and narratives', color: 'info', count: 12 },
        { id: 'songs', name: 'Songs', description: 'Traditional and modern songs', color: 'warning', count: 6 },
        { id: 'poetry', name: 'Poetry', description: 'Poems and verses', color: 'error', count: 4 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('metadata.')) {
      const metadataField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) return

    const newTextData: TextData = {
      id: editingItem?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      language: formData.language,
      category: formData.category,
      tags: formData.tags,
      status: editingItem?.status || 'draft',
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      wordCount: formData.content.split(' ').length,
      characterCount: formData.content.length,
      isFavorite: editingItem?.isFavorite || false,
      metadata: formData.metadata,
    }

    if (editingItem) {
      setTextData(prev => prev.map(item => item.id === editingItem.id ? newTextData : item))
    } else {
      setTextData(prev => [newTextData, ...prev])
    }

    setOpenDialog(false)
    setEditingItem(null)
    setFormData({
      title: '',
      content: '',
      language: 'sw',
      category: '',
      tags: [],
      metadata: {
        source: '',
        difficulty: 'beginner',
        topic: '',
        region: '',
      }
    })
  }

  const handleEdit = (item: TextData) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      content: item.content,
      language: item.language,
      category: item.category,
      tags: item.tags,
      metadata: item.metadata,
    })
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    setTextData(prev => prev.filter(item => item.id !== id))
  }

  const handleToggleFavorite = (id: string) => {
    setTextData(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'reviewed': return <CheckCircle sx={{ color: 'info.main', fontSize: 20 }} />
      case 'approved': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'published': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      default: return <Info sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'warning'
      case 'reviewed': return 'info'
      case 'approved': return 'success'
      case 'published': return 'success'
      default: return 'default'
    }
  }

  const filteredData = textData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesFavorites = !showFavoritesOnly || item.isFavorite
    
    return matchesSearch && matchesCategory && matchesFavorites
  })

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography>Loading text data...</Typography>
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
                Text Data Capture
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Collect and manage text content in African languages
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextFields sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {textData.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Texts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                {textData.reduce((sum, item) => sum + item.wordCount, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Words
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {languages.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Languages
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {textData.filter(item => item.isFavorite).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Favorites
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Text Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    cursor: 'pointer',
                    borderColor: selectedCategory === category.id ? `${category.color}.main` : undefined,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: `${category.color}.main` }}>
                    {category.count}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {category.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Search texts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="title">Title A-Z</MenuItem>
                <MenuItem value="language">Language</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                />
              }
              label="Favorites Only"
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Text
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Text Data Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Text Data ({filteredData.length})
          </Typography>

          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TextFields sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No text data found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || selectedCategory !== 'all' || showFavoritesOnly
                  ? 'Try adjusting your filters'
                  : 'Start adding text content in African languages'
                }
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Content Preview</TableCell>
                    <TableCell>Words</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(item.lastModified).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{languages.find(l => l.code === item.language)?.flag}</span>
                          <Typography variant="body2">
                            {languages.find(l => l.code === item.language)?.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={categories.find(c => c.id === item.category)?.name || item.category}
                          size="small"
                          color={categories.find(c => c.id === item.category)?.color as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.content}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.wordCount}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(item.status)}
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {item.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleFavorite(item.id)}
                          >
                            {item.isFavorite ? <Bookmark sx={{ color: 'warning.main' }} /> : <Bookmark />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item.id)}
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
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Text Data' : 'Add New Text Data'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
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
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              label="Content"
              fullWidth
              multiline
              rows={6}
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Enter your text content here..."
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Source"
                fullWidth
                value={formData.metadata.source}
                onChange={(e) => handleInputChange('metadata.source', e.target.value)}
              />
              <TextField
                label="Topic"
                fullWidth
                value={formData.metadata.topic}
                onChange={(e) => handleInputChange('metadata.topic', e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={formData.metadata.difficulty}
                  onChange={(e) => handleInputChange('metadata.difficulty', e.target.value)}
                  label="Difficulty"
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Region"
                fullWidth
                value={formData.metadata.region}
                onChange={(e) => handleInputChange('metadata.region', e.target.value)}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {predefinedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    clickable
                    color={formData.tags.includes(tag) ? 'primary' : 'default'}
                    onClick={() => {
                      const newTags = formData.tags.includes(tag)
                        ? formData.tags.filter(t => t !== tag)
                        : [...formData.tags, tag]
                      handleInputChange('tags', newTags)
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingItem ? 'Update' : 'Save'} Text
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
