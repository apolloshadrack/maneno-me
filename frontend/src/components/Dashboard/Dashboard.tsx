import { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material'
import {
  Language,
  People,
  Mic,
  Translate,
  TrendingUp,
  CheckCircle,
  Warning,
  Error,
  AccessTime,
} from '@mui/icons-material'

interface Language {
  id: number
  name: string
  code: string
  family: string
  status: 'active' | 'endangered' | 'critical'
  speakerCount: number
  priorityTier: number
  contributors: number
  recordings: number
  translations: number
  region: string
}

interface Activity {
  id: number
  type: 'recording' | 'translation' | 'upload' | 'contribution'
  user: string
  action: string
  language: string
  timestamp: string
  status: 'completed' | 'pending' | 'processing'
}

export default function Dashboard() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLanguages([
        {
          id: 1,
          name: 'Kiswahili',
          code: 'sw',
          family: 'Bantu',
          status: 'active',
          speakerCount: 15000000,
          priorityTier: 1,
          contributors: 234,
          recordings: 2847,
          translations: 5623,
          region: 'East Africa'
        },
        {
          id: 2,
          name: 'Yorùbá',
          code: 'yo',
          family: 'Niger-Congo',
          status: 'active',
          speakerCount: 45000000,
          priorityTier: 1,
          contributors: 189,
          recordings: 1923,
          translations: 3847,
          region: 'West Africa'
        },
        {
          id: 3,
          name: 'IsiZulu',
          code: 'zu',
          family: 'Bantu',
          status: 'active',
          speakerCount: 12000000,
          priorityTier: 1,
          contributors: 156,
          recordings: 1456,
          translations: 2934,
          region: 'Southern Africa'
        },
        {
          id: 4,
          name: 'Hausa',
          code: 'ha',
          family: 'Afro-Asiatic',
          status: 'active',
          speakerCount: 80000000,
          priorityTier: 1,
          contributors: 201,
          recordings: 2134,
          translations: 4123,
          region: 'West Africa'
        },
        {
          id: 5,
          name: 'Amharic',
          code: 'am',
          family: 'Afro-Asiatic',
          status: 'active',
          speakerCount: 32000000,
          priorityTier: 1,
          contributors: 98,
          recordings: 987,
          translations: 1876,
          region: 'East Africa'
        },
        {
          id: 6,
          name: 'El Molo',
          code: 'elo',
          family: 'Cushitic',
          status: 'critical',
          speakerCount: 1000,
          priorityTier: 3,
          contributors: 12,
          recordings: 45,
          translations: 89,
          region: 'East Africa'
        }
      ])

      setActivities([
        {
          id: 1,
          type: 'recording',
          user: 'Dr. Amina Okafor',
          action: 'recorded 15 minutes of Yorùbá folktales',
          language: 'Yorùbá',
          timestamp: '2 minutes ago',
          status: 'completed'
        },
        {
          id: 2,
          type: 'translation',
          user: 'Prof. Kwame Asante',
          action: 'translated 50 proverbs from Twi to English',
          language: 'Twi',
          timestamp: '15 minutes ago',
          status: 'completed'
        },
        {
          id: 3,
          type: 'upload',
          user: 'Sarah Mwangi',
          action: 'uploaded cultural context for Kiswahili greetings',
          language: 'Kiswahili',
          timestamp: '1 hour ago',
          status: 'processing'
        },
        {
          id: 4,
          type: 'contribution',
          user: 'Ahmed Hassan',
          action: 'contributed pronunciation guide for Hausa',
          language: 'Hausa',
          timestamp: '2 hours ago',
          status: 'completed'
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'endangered':
        return <Warning sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'critical':
        return <Error sx={{ color: 'error.main', fontSize: 20 }} />
      default:
        return <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'endangered':
        return 'warning'
      case 'critical':
        return 'error'
      default:
        return 'default'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'recording':
        return <Mic sx={{ color: 'primary.main', fontSize: 20 }} />
      case 'translation':
        return <Translate sx={{ color: 'success.main', fontSize: 20 }} />
      case 'upload':
        return <TrendingUp sx={{ color: 'info.main', fontSize: 20 }} />
      case 'contribution':
        return <People sx={{ color: 'secondary.main', fontSize: 20 }} />
      default:
        return <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const stats = [
    {
      title: 'Total Languages',
      value: '47',
      icon: <Language sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+3 this month',
      color: 'primary'
    },
    {
      title: 'Active Contributors',
      value: '1,247',
      icon: <People sx={{ fontSize: 40, color: 'success.main' }} />,
      change: '+127 this week',
      color: 'success'
    },
    {
      title: 'Voice Recordings',
      value: '8,932',
      icon: <Mic sx={{ fontSize: 40, color: 'info.main' }} />,
      change: '+456 today',
      color: 'info'
    },
    {
      title: 'Translations',
      value: '15,683',
      icon: <Translate sx={{ fontSize: 40, color: 'secondary.main' }} />,
      change: '+1,234 this week',
      color: 'secondary'
    }
  ]

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <LinearProgress sx={{ width: '100%' }} />
      </Box>
    )
  }

  return (
    <Box>
      {/* Welcome Section */}
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
              Karibu Maneno! 🇰🇪
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              Welcome to Africa&apos;s premier language preservation platform
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Language sx={{ fontSize: 20 }} />
                <Typography variant="body1">47 Languages</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People sx={{ fontSize: 20 }} />
                <Typography variant="body1">1,247 Contributors</Typography>
              </Box>
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              fontSize: 40,
            }}
          >
            <Language />
          </Avatar>
        </Box>
      </Paper>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                {stat.icon}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {stat.change}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Languages List */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              African Languages
            </Typography>
            <List>
              {languages.map((language, index) => (
                <Fragment key={language.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      '&:hover': {
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                        {language.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {language.name}
                          </Typography>
                          <Chip
                            label={language.code.toUpperCase()}
                            size="small"
                            variant="outlined"
                          />
                          {getStatusIcon(language.status)}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {language.family} • {language.region}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {language.speakerCount.toLocaleString()} speakers
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {language.contributors} contributors
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {language.recordings.toLocaleString()} recordings
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={`Tier ${language.priorityTier}`}
                        size="small"
                        color={getStatusColor(language.status) as any}
                      />
                    </Box>
                  </ListItem>
                  {index < languages.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Activity
            </Typography>
            <List>
              {activities.map((activity) => (
                <ListItem key={activity.id} sx={{ py: 1.5, px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {activity.user}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {activity.action}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Chip
                            label={activity.language}
                            size="small"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}