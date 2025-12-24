import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  IconButton,
  Tooltip,
  CardActions,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

const NewsCard = ({ article, showSummary = false }) => {
  const theme = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if article is bookmarked
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    setIsBookmarked(bookmarkedArticles.some(a => a.url === article.url));
  }, [article.url]);

  const handleBookmark = () => {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    
    if (isBookmarked) {
      const filtered = bookmarkedArticles.filter(a => a.url !== article.url);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(filtered));
      setIsBookmarked(false);
    } else {
      bookmarkedArticles.push({
        ...article,
        bookmarkedAt: new Date().toISOString()
      });
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
      setIsBookmarked(true);
    }
    
    // Dispatch custom event to update navbar count
    window.dispatchEvent(new Event('bookmarkChanged'));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(article.url);
    }
  };

  const getSourceColor = (sourceName) => {
    const colors = ['primary', 'secondary', 'success', 'warning'];
    const hash = sourceName?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };
  
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        zIndex: 1,
      }
    }}>
      {article.urlToImage && (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="220"
            image={article.urlToImage}
            alt={article.title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 1,
          }}>
            <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark for offline reading'}>
              <IconButton
                onClick={handleBookmark}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
                size="small"
              >
                {isBookmarked ? (
                  <BookmarkIcon color="primary" />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={article.source?.name} 
            size="small" 
            color={getSourceColor(article.source?.name)}
            variant="outlined"
            sx={{ 
              fontWeight: 600,
              borderWidth: '1.5px',
            }} 
          />
          {article.author && (
            <Chip 
              label={`By ${article.author}`} 
              size="small" 
              variant="filled"
              sx={{ 
                backgroundColor: theme.palette.grey[100],
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }} 
            />
          )}
        </Box>
        
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.description}
        </Typography>
        
        {showSummary && article.aiSummary && (
          <Accordion 
            sx={{ 
              mb: 2,
              boxShadow: 'none',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: theme.palette.primary.main + '08',
                borderRadius: '8px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                AI Summary
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {article.aiSummary}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            {format(new Date(article.publishedAt), 'MMM d, yyyy • h:mm a')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={<OpenInNewIcon />}
          onClick={() => window.open(article.url, '_blank')}
          sx={{ mr: 'auto' }}
        >
          Read Full Article
        </Button>
        <IconButton size="small" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NewsCard;