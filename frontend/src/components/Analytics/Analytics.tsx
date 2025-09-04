import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  Language,
  Mic,
  Translate,
  People,
  Download,
  BarChart,
  PieChart,
  Timeline,
} from '@mui/icons-material'

interface AnalyticsData {
  totalRecordings: number
  totalTranslations: number
  totalContributors: number
  totalLanguages: number
  monthlyGrowth: number
  weeklyActivity: number
}

interface LanguageStats {
  name: string
  code: string
  recordings: number
  translations: number
  contributors: number
  growth: number
  status: 'active' | 'endangered' | 'critical'
}

interface ActivityData {
  date: string
  recordings: number
  translations: number
  contributors: number
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([])
  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setAnalyticsData({
        totalRecordings: 8932,
        totalTranslations: 15683,
        totalContributors: 1247,
        totalLanguages: 47,
        monthlyGrowth: 23.5,
        weeklyActivity: 156,
      })

      setLanguageStats([
        { name: 'Kiswahili', code: 'sw', recordings: 2847, translations: 5623, contributors: 234, growth: 15.2, status: 'active' },
        { name: 'Yorùbá', code: 'yo', recordings: 1923, translations: 3847, contributors: 189, growth: 12.8, status: 'active' },
        { name: 'IsiZulu', code: 'zu', recordings: 1456, translations: 2934, contributors: 156, growth: 8.4, status: 'active' },
        { name: 'Hausa', code: 'ha', recordings: 2134, translations: 4123, contributors: 201, growth: 18.7, status: 'active' },
        { name: 'Amharic', code: 'am', recordings: 987, translations: 1876, contributors: 98, growth: 5.3, status: 'active' },
        { name: 'El Molo', code: 'elo', recordings: 45, translations: 89, contributors: 12, growth: -2.1, status: 'critical' },
      ])

      setActivityData([
        { date: '2024-01', recordings: 1200, translations: 800, contributors: 45 },
        { date: '2024-02', recordings: 1900, translations: 1200, contributors: 67 },
        { date: '2024-03', recordings: 3000, translations: 1800, contributors: 89 },
        { date: '2024-04', recordings: 2800, translations: 2000, contributors: 78 },
        { date: '2024-05', recordings: 1890, translations: 1500, contributors: 56 },
        { date: '2024-06', recordings: 2390, translations: 1700, contributors: 72 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'endangered': return 'warning'
      case 'critical': return 'error'
      default: return 'default'
    }
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp sx={{ color: 'success.main' }} /> : <TrendingDown sx={{ color: 'error.main' }} />
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
              Analytics Dashboard
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Comprehensive insights into language preservation efforts
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
            <BarChart sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Paper>

      {/* Key Metrics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {analyticsData?.totalRecordings.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Voice Recordings
                </Typography>
              </Box>
              <Mic sx={{ fontSize: 40, color: 'primary.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              +{analyticsData?.monthlyGrowth}% this month
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {analyticsData?.totalTranslations.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Translations
                </Typography>
              </Box>
              <Translate sx={{ fontSize: 40, color: 'success.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              +{analyticsData?.monthlyGrowth}% this month
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  {analyticsData?.totalContributors.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contributors
                </Typography>
              </Box>
              <People sx={{ fontSize: 40, color: 'secondary.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              +{analyticsData?.weeklyActivity} this week
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  {analyticsData?.totalLanguages}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Languages
                </Typography>
              </Box>
              <Language sx={{ fontSize: 40, color: 'warning.main' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Active preservation
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Language Performance" />
            <Tab label="Activity Trends" />
            <Tab label="Contributor Insights" />
            <Tab label="Data Export" />
          </Tabs>
        </Box>

        <CardContent>
          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Language Performance Metrics
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Language</TableCell>
                      <TableCell align="right">Recordings</TableCell>
                      <TableCell align="right">Translations</TableCell>
                      <TableCell align="right">Contributors</TableCell>
                      <TableCell align="right">Growth</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {languageStats.map((lang) => (
                      <TableRow key={lang.code}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.50', color: 'primary.main' }}>
                              {lang.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {lang.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {lang.code.toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{lang.recordings.toLocaleString()}</TableCell>
                        <TableCell align="right">{lang.translations.toLocaleString()}</TableCell>
                        <TableCell align="right">{lang.contributors}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                            {getGrowthIcon(lang.growth)}
                            <Typography variant="body2" color={lang.growth >= 0 ? 'success.main' : 'error.main'}>
                              {lang.growth}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={lang.status}
                            size="small"
                            color={getStatusColor(lang.status) as any}
                          />
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
                Activity Trends
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Timeline sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Activity Chart
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly trends visualization coming soon
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Contributor Insights
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Top Contributors
                    </Typography>
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Dr. Amina Okafor"
                          secondary="234 contributions"
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'success.main' }}>K</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Prof. Kwame Asante"
                          secondary="189 contributions"
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'warning.main' }}>S</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Sarah Mwangi"
                          secondary="156 contributions"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Regional Distribution
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">East Africa</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>45%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">West Africa</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>32%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Southern Africa</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>23%</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}

          {selectedTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Data Export
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 3 }}>
                  <Download sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    CSV Export
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Download all language data in CSV format
                  </Typography>
                  <Chip label="Available" color="success" />
                </Card>

                <Card variant="outlined" sx={{ textAlign: 'center', p: 3 }}>
                  <BarChart sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    JSON Export
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Structured data for API integration
                  </Typography>
                  <Chip label="Available" color="success" />
                </Card>

                <Card variant="outlined" sx={{ textAlign: 'center', p: 3 }}>
                  <PieChart sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    PDF Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Comprehensive analytics report
                  </Typography>
                  <Chip label="Coming Soon" color="default" />
                </Card>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
