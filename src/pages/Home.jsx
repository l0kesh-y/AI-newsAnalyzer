import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Grid, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Switch, 
  FormControlLabel,
  Fade,
  Skeleton
} from '@mui/material';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const Home = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSummaries, setShowSummaries] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const endpoint = showSummaries ? '/api/news/category-summary' : '/api/news/headlines';
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
          params: {
            country: 'us',
            category: category || 'general'
          }
        });
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, showSummaries]);

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'General';

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <CategoryFilter currentCategory={category} />
        <Paper sx={{ p: 4, mb: 4 }}>
          <Skeleton variant="text" width="40%" height={60} />
          <Skeleton variant="text" width="60%" height={30} />
        </Paper>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
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
            Unable to Load News
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
      <CategoryFilter currentCategory={category} />
      
      <Fade in={true} timeout={800}>
        <Paper sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.1)',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {categoryName} News
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={showSummaries}
                  onChange={(e) => setShowSummaries(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'primary.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  AI Summaries
                </Typography>
              }
            />
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Latest breaking news and updates from the {categoryName.toLowerCase()} category
            {showSummaries && ' • Enhanced with AI-powered insights'}
          </Typography>
        </Paper>
      </Fade>
      
      <Fade in={!loading} timeout={1000}>
        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <NewsCard article={article} showSummary={showSummaries} />
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Container>
  );
};

export default Home;