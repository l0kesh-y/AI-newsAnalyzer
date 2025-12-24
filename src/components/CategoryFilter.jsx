import { Button, ButtonGroup, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'general', name: 'General' },
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' }
];

const CategoryFilter = ({ currentCategory }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      mb: 4, 
      overflowX: 'auto', 
      whiteSpace: 'nowrap',
      pb: 1,
      '&::-webkit-scrollbar': {
        height: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '2px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'primary.main',
        borderRadius: '2px',
      },
    }}>
      <Box sx={{ display: 'flex', gap: 1.5, minWidth: 'fit-content', px: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            onClick={() => navigate(`/category/${category.id}`)}
            variant={currentCategory === category.id ? 'filled' : 'outlined'}
            color={currentCategory === category.id ? 'primary' : 'default'}
            sx={{ 
              fontWeight: currentCategory === category.id ? 700 : 500,
              fontSize: '0.875rem',
              height: '40px',
              px: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: currentCategory === category.id ? 'none' : '1.5px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderColor: currentCategory === category.id ? 'transparent' : 'primary.main',
              },
              ...(currentCategory === category.id && {
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
              }),
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilter;