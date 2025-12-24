import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Grid, 
  Box, 
  CircularProgress, 
  Typography, 
  Container, 
  Paper,
  Fade,
  Skeleton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/news/search`, {
          params: {
            query,
            sortBy: 'publishedAt',
            pageSize: 50
          }
        });
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchNews();
    }
  }, [query]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="40%" height={30} />
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
            Search Error
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
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.1)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SearchIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Search Results
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Found {articles.length} articles for "{query}"
          </Typography>
        </Paper>
      </Fade>
      
      <Fade in={!loading} timeout={1000}>
        <Grid container spacing={3}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <NewsCard article={article} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 6, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.05) 0%, rgba(148, 163, 184, 0.05) 100%)',
                border: '1px solid rgba(100, 116, 139, 0.1)',
              }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                  No Results Found
                </Typography>
                <Typography color="text.secondary">
                  Try searching with different keywords or check your spelling.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Fade>
    </Container>
  );
};

export default Search;