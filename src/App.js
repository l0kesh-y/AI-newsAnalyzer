// src/App.js
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Fade } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Search from './pages/Search';
import TopNews from './pages/TopNews';
import OfflineReading from './pages/OfflineReading';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import theme from './assets/styles/theme';

const App = () => {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode,
      ...(mode === 'dark' && {
        background: { default: '#0f172a', paper: '#1e293b' },
        text: { primary: '#f8fafc', secondary: '#cbd5e1' },
      }),
    },
  });

  const toggleTheme = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  if (loading) {
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: 2 }}>NewsHub Pro</Box>
            <Box sx={{ width: 40, height: 4, background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)', borderRadius: 2, mx: 'auto', animation: 'pulse 1.5s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.5 } } }} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Fade in={!loading} timeout={800}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: mode === 'dark' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <Navbar toggleTheme={toggleTheme} mode={mode} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/top-news" element={<TopNews />} />
                <Route path="/offline" element={<OfflineReading />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/category/:category" element={<Home />} />
              </Routes>
            </Box>
          </Box>
        </Fade>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;