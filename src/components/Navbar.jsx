import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleTheme, mode }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const updateBookmarkCount = () => {
      const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
      setBookmarkCount(bookmarkedArticles.length);
    };
    updateBookmarkCount();
    window.addEventListener('storage', updateBookmarkCount);
    window.addEventListener('bookmarkChanged', updateBookmarkCount);
    return () => {
      window.removeEventListener('storage', updateBookmarkCount);
      window.removeEventListener('bookmarkChanged', updateBookmarkCount);
    };
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ py: 1, background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(226, 232, 240, 0.1)', borderRadius: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="button" onClick={() => navigate('/')}
              sx={{ fontWeight: 800, color: 'inherit', textDecoration: 'none', mr: 4, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', border: 'none', cursor: 'pointer', fontSize: '1.75rem' }}>
              NewsHub Pro
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/')} sx={{ textTransform: 'none', fontWeight: 500, px: 2, py: 1, borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/top-news')} startIcon={<TrendingUpIcon />} sx={{ textTransform: 'none', fontWeight: 500, px: 2, py: 1, borderRadius: '8px', '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>Top Stories</Button>
            <IconButton color="inherit" onClick={() => navigate('/offline')} sx={{ '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>
              <Badge badgeContent={bookmarkCount} color="primary"><BookmarkIcon /></Badge>
            </IconButton>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 4 }}><SearchBar /></Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle toggleTheme={toggleTheme} mode={mode} />
            
            {isAuthenticated() ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <MenuItem disabled>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{user?.fullName}</Typography>
                      <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}><LogoutIcon sx={{ mr: 1 }} fontSize="small" />Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')} sx={{ textTransform: 'none', fontWeight: 500 }}>Login</Button>
                <Button variant="contained" onClick={() => navigate('/signup')} sx={{ textTransform: 'none', fontWeight: 600, background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' }}>Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;