import { useEffect, useState } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  IconButton, 
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NewsCard from '../components/NewsCard';

const OfflineReading = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    setBookmarkedArticles(articles);
  }, []);

  const handleDeleteArticle = (article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      const filtered = bookmarkedArticles.filter(a => a.url !== articleToDelete.url);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(filtered));
      setBookmarkedArticles(filtered);
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
      
      // Dispatch custom event to update navbar count
      window.dispatchEvent(new Event('bookmarkChanged'));
    }
  };

  const clearAllBookmarks = () => {
    localStorage.removeItem('bookmarkedArticles');
    setBookmarkedArticles([]);
    
    // Dispatch custom event to update navbar count
    window.dispatchEvent(new Event('bookmarkChanged'));
  };

  if (bookmarkedArticles.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}>
          <CloudOffIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            No Offline Articles
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
            Start bookmarking articles to read them offline. Click the bookmark icon on any news card to save it for later.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.history.back()}
            sx={{ mt: 2 }}
          >
            Browse News
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.1)',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BookmarkIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Offline Reading
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={`${bookmarkedArticles.length} articles saved`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            {bookmarkedArticles.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                onClick={clearAllBookmarks}
                size="small"
              >
                Clear All
              </Button>
            )}
          </Box>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Your bookmarked articles are available for offline reading
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {bookmarkedArticles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ position: 'relative' }}>
              <NewsCard article={article} showSummary={true} />
              <IconButton
                onClick={() => handleDeleteArticle(article)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(220, 38, 38, 0.9)',
                  },
                  zIndex: 2,
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Remove Bookmark</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this article from your offline reading list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OfflineReading;