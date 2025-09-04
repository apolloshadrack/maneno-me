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
  Button,
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
  Menu,
  MenuItem as MenuItemComponent,
} from '@mui/material'
import {
  People,
  Add,
  MoreVert,
  Edit,
  Delete,
  PersonAdd,
  Group,
  School,
  Language,
  Mic,
  Translate,
  CheckCircle,
  Pending,
  Block,
} from '@mui/icons-material'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'contributor' | 'reviewer'
  status: 'active' | 'pending' | 'inactive'
  languages: string[]
  contributions: number
  joinDate: string
  lastActive: string
  avatar?: string
}

interface Project {
  id: string
  name: string
  description: string
  languages: string[]
  members: number
  status: 'active' | 'completed' | 'paused'
  createdDate: string
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setMembers([
        {
          id: '1',
          name: 'Dr. Amina Okafor',
          email: 'amina@maneno.me',
          role: 'admin',
          status: 'active',
          languages: ['Kiswahili', 'Yorùbá', 'Hausa'],
          contributions: 234,
          joinDate: '2023-01-15',
          lastActive: '2024-09-04',
        },
        {
          id: '2',
          name: 'Prof. Kwame Asante',
          email: 'kwame@maneno.me',
          role: 'moderator',
          status: 'active',
          languages: ['Twi', 'Akan', 'English'],
          contributions: 189,
          joinDate: '2023-02-20',
          lastActive: '2024-09-03',
        },
        {
          id: '3',
          name: 'Sarah Mwangi',
          email: 'sarah@maneno.me',
          role: 'contributor',
          status: 'active',
          languages: ['Kiswahili', 'Kikuyu'],
          contributions: 156,
          joinDate: '2023-03-10',
          lastActive: '2024-09-02',
        },
        {
          id: '4',
          name: 'Ahmed Hassan',
          email: 'ahmed@maneno.me',
          role: 'reviewer',
          status: 'pending',
          languages: ['Hausa', 'Arabic'],
          contributions: 45,
          joinDate: '2024-08-15',
          lastActive: '2024-08-30',
        },
        {
          id: '5',
          name: 'Dr. Fatima Al-Zahra',
          email: 'fatima@maneno.me',
          role: 'contributor',
          status: 'inactive',
          languages: ['Berber', 'Arabic'],
          contributions: 78,
          joinDate: '2023-06-01',
          lastActive: '2024-07-15',
        },
      ])

      setProjects([
        {
          id: '1',
          name: 'East African Languages Initiative',
          description: 'Comprehensive documentation of East African languages',
          languages: ['Kiswahili', 'Kikuyu', 'Luo', 'Kalenjin'],
          members: 12,
          status: 'active',
          createdDate: '2023-01-01',
        },
        {
          id: '2',
          name: 'West African Oral Traditions',
          description: 'Preservation of oral traditions and folktales',
          languages: ['Yorùbá', 'Hausa', 'Twi', 'Igbo'],
          members: 8,
          status: 'active',
          createdDate: '2023-03-15',
        },
        {
          id: '3',
          name: 'Southern African Documentation',
          description: 'Documentation of Southern African languages',
          languages: ['IsiZulu', 'Xhosa', 'Sesotho'],
          members: 6,
          status: 'completed',
          createdDate: '2022-11-01',
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'error'
      case 'moderator': return 'warning'
      case 'contributor': return 'success'
      case 'reviewer': return 'info'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
      case 'pending': return <Pending sx={{ color: 'warning.main', fontSize: 20 }} />
      case 'inactive': return <Block sx={{ color: 'error.main', fontSize: 20 }} />
      default: return <Pending sx={{ color: 'text.secondary', fontSize: 20 }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'pending': return 'warning'
      case 'inactive': return 'error'
      default: return 'default'
    }
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, member: TeamMember) => {
    setAnchorEl(event.currentTarget)
    setSelectedMember(member)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMember(null)
  }

  const handleEditMember = () => {
    if (selectedMember) {
      setEditingMember(selectedMember)
      setOpenDialog(true)
    }
    handleMenuClose()
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setOpenDialog(true)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography>Loading team data...</Typography>
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
              Team Management
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Manage contributors and project teams
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
            <People sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Team Members" />
            <Tab label="Projects" />
            <Tab label="Roles & Permissions" />
          </Tabs>
        </Box>

        <CardContent>
          {selectedTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Members ({members.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={handleAddMember}
                >
                  Add Member
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Languages</TableCell>
                      <TableCell align="right">Contributions</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {member.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {member.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {member.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={member.role}
                            size="small"
                            color={getRoleColor(member.role) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {member.languages.slice(0, 2).map((lang) => (
                              <Chip
                                key={lang}
                                label={lang}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                            {member.languages.length > 2 && (
                              <Chip
                                label={`+${member.languages.length - 2}`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{member.contributions}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(member.status)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {member.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, member)}
                            size="small"
                          >
                            <MoreVert />
                          </IconButton>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Projects ({projects.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                >
                  New Project
                </Button>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                {projects.map((project) => (
                  <Card key={project.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.status}
                          size="small"
                          color={project.status === 'active' ? 'success' : project.status === 'completed' ? 'info' : 'warning'}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            Languages
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {project.languages.length}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            Members
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {project.members}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            Created
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {new Date(project.createdDate).toLocaleDateString()}
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
                Roles & Permissions
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'error.main' }}>
                      Admin
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Full system access and management capabilities
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Manage all users and projects</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Access analytics and reports</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">System configuration</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
                      Moderator
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Content moderation and project management
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Review and approve content</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Manage project teams</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Access project analytics</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                      Contributor
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Add and edit language content
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Upload recordings and translations</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Edit existing content</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">View project progress</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'info.main' }}>
                      Reviewer
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Review and validate content quality
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Review submitted content</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Provide feedback</Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">Approve or reject submissions</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Member Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMember ? 'Edit Member' : 'Add New Member'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              defaultValue={editingMember?.name || ''}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              defaultValue={editingMember?.email || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue={editingMember?.role || 'contributor'}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
                <MenuItem value="contributor">Contributor</MenuItem>
                <MenuItem value="reviewer">Reviewer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={editingMember?.status || 'pending'}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">
            {editingMember ? 'Update' : 'Add'} Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* Member Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={handleEditMember}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItemComponent>
        <MenuItemComponent onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} />
          Remove
        </MenuItemComponent>
      </Menu>
    </Box>
  )
}
