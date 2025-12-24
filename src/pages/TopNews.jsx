import { useEffect, useState, useRef } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Container, 
  Paper,
  Fade,
  Skeleton
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ai-newsanalyzer.onrender.com';

const TopNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchTopNews = async () => {
      if (fetchedRef.current && articles.length > 0) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/news/top10`, {
          params: {
            country: 'us'
          },
          timeout: 30000
        });
        setArticles(response.data);
        fetchedRef.current = true;
      } catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchTopNews();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Skeleton variant="text" width="50%" height={60} />
          <Skeleton variant="text" width="70%" height={30} />
        </Paper>
        <Grid container spacing={3}>
          {[...Array(10)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Skeleton variant="rectangular" height={220} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        }}>
          <Typography variant="h5" color="error" sx={{ mb: 2, fontWeight: 600 }}>
            Unable to Load Top Stories
          </Typography>
          <Typography color="text.secondary">
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Paper sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.1)',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Top Stories Today
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            The most important news stories of the day • Enhanced with AI-powered summaries
          </Typography>
        </Paper>
      </Fade>
      
      <Fade in={!loading} timeout={1000}>
        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ position: 'relative' }}>
                {index < 3 && (
                  <Box sx={{
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    zIndex: 2,
                    backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                    color: 'white',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}>
                    {index + 1}
                  </Box>
                )}
                <NewsCard article={article} showSummary={true} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Container>
  );
};

export default TopNews;