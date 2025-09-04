import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home,
  Mic,
  Translate,
  Analytics,
  People,
  OfflinePin,
  Notifications,
  Language,
  Search,
  CloudUpload,
  TextFields,
  Settings,
  Logout,
  AccountCircle,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

const drawerWidth = 280

const navigationItems = [
  { text: 'Dashboard', icon: Home, path: '/' },
  { text: 'Voice Capture', icon: Mic, path: '/voice' },
  { text: 'Multimodal Data', icon: CloudUpload, path: '/multimodal' },
  { text: 'Text Data', icon: TextFields, path: '/text' },
  { text: 'Translation', icon: Translate, path: '/translation' },
  { text: 'Analytics', icon: Analytics, path: '/analytics' },
  { text: 'Team Management', icon: People, path: '/team' },
  { text: 'Offline Mode', icon: OfflinePin, path: '/offline' },
  { text: 'Localization', icon: Settings, path: '/localization' },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'zu', name: 'IsiZulu', flag: '🇿🇦' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode)
    handleProfileMenuClose()
  }

  const handleLogout = () => {
    logout()
    handleProfileClose()
    navigate('/')
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Language sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Maneno
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              African Languages
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <ListItem
              key={item.text}
              onClick={() => {
                navigate(item.path)
                if (isMobile) setMobileOpen(false)
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                cursor: 'pointer',
                bgcolor: isActive ? 'primary.50' : 'transparent',
                '&:hover': {
                  bgcolor: isActive ? 'primary.100' : 'action.hover',
                },
                transition: 'background-color 0.2s',
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? 'primary.main' : 'text.secondary',
                  minWidth: 40,
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItem>
          )
        })}
      </List>

      {/* Data Overview */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
          Data Overview
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Voice Recordings
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              8,932
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Translations
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              15,683
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Contributors
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              1,247
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {navigationItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          {/* Search */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2, minWidth: 300 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'text.secondary',
                }}
              >
                <Search fontSize="small" />
              </Box>
              <input
                type="text"
                placeholder="Search languages, translations..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                }}
              />
            </Box>
          </Box>

          {/* Language Selector */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                selected={selectedLanguage === lang.code}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Notifications */}
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Language Button */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ mr: 1 }}
          >
            <Language />
          </IconButton>

          {/* Profile */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
              borderRadius: 1,
              p: 0.5,
            }}
            onClick={handleProfileClick}
          >
            <Avatar 
              sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
              src={user?.avatar}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role || 'Contributor'}
              </Typography>
            </Box>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
