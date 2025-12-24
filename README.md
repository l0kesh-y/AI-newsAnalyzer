# NewsHub Pro - Modern News Aggregator

A cutting-edge news aggregation platform built with React and Spring Boot, featuring AI-powered summaries, offline reading capabilities, and a stunning modern UI design.

## ✨ Features

### 🎨 Modern Professional UI
- **Clean Design**: Sleek, emoji-free interface with modern Material-UI components
- **Gradient Aesthetics**: Beautiful gradient backgrounds and text effects
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Smooth Animations**: Fluid transitions and hover effects
- **Responsive Design**: Perfect on all devices from mobile to desktop
- **Dark/Light Theme**: Toggle between elegant themes

### 📰 News Features
- **Top Stories**: Daily top 10 news with AI summaries and ranking badges
- **Category Navigation**: Browse by General, Business, Entertainment, Health, Science, Sports, Technology
- **Smart Search**: Advanced search with beautiful results presentation
- **AI Summaries**: Powered by Groq API for concise article insights
- **Real-time Updates**: Latest breaking news and updates

### 📱 Offline Reading
- **Bookmark Articles**: Save articles for offline reading with one click
- **Local Storage**: Articles stored locally for offline access
- **Bookmark Management**: Easy deletion and bulk operations
- **Offline Indicator**: Visual feedback for offline capabilities
- **Service Worker**: PWA support for true offline functionality

### 🚀 Performance & UX
- **Loading States**: Beautiful skeleton loaders and animations
- **Error Handling**: Elegant error states with helpful messages
- **Progressive Web App**: Install as native app on any device
- **Fast Loading**: Optimized bundle size and lazy loading
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠 Tech Stack

### Frontend
- **React 18** - Latest React with hooks and concurrent features
- **Material-UI v5** - Modern component library with custom theming
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Date-fns** - Modern date utility library
- **Service Worker** - Offline functionality

### Backend
- **Spring Boot 3.1.0** - Modern Java framework
- **Java 17** - Latest LTS Java version
- **RestTemplate** - HTTP client for external APIs
- **Lombok** - Boilerplate reduction

### APIs & Services
- **NewsAPI** - Primary news data source
- **Groq API** - AI-powered article summaries using Llama models

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Java 17+ and Maven 3.6+
- NewsAPI key (free at [newsapi.org](https://newsapi.org/))
- Groq API key (free at [console.groq.com](https://console.groq.com/))

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd newsaggregator-backend
   ```

2. **Configure API keys in `src/main/resources/application.properties`:**
   ```properties
   newsapi.key=YOUR_NEWSAPI_KEY_HERE
   groq.api.key=YOUR_GROQ_API_KEY_HERE
   ```

3. **Start the Spring Boot server:**
   ```bash
   ./mvnw spring-boot:run
   ```
   Server runs on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd news-aggregator-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   App runs on `http://localhost:3000`

## 📱 PWA Installation

NewsHub Pro can be installed as a Progressive Web App:

1. **Chrome/Edge**: Click the install icon in the address bar
2. **Mobile**: Use "Add to Home Screen" from browser menu
3. **Desktop**: Look for install prompt or use browser menu

## 🎯 API Endpoints

### News Endpoints
- `GET /api/news/headlines` - Category-based headlines
- `GET /api/news/top10` - Top 10 news with AI summaries
- `GET /api/news/category-summary` - Category news with AI summaries
- `GET /api/news/search` - Search news articles

### Parameters
- `country` - Country code (default: 'us')
- `category` - News category (default: 'general')
- `query` - Search query string
- `sortBy` - Sort order (default: 'publishedAt')
- `pageSize` - Results per page (default: 20)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#2563eb → #3b82f6)
- **Secondary**: Purple gradient (#7c3aed → #8b5cf6)
- **Background**: Light gray (#f8fafc)
- **Text**: Slate colors (#1e293b, #64748b)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300-900 available
- **Hierarchy**: Clear heading and body text scales

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Navigation**: Sticky header with backdrop blur
- **Forms**: Rounded inputs with focus states

## 🔧 Customization

### Theme Customization
Edit `src/assets/styles/theme.js` to customize:
- Colors and gradients
- Typography scales
- Component styles
- Shadows and effects

### Adding New Categories
Update the `categories` array in `CategoryFilter.jsx`:
```javascript
const categories = [
  { id: 'your-category', name: 'Your Category' },
  // ... existing categories
];
```

### Offline Storage
Bookmarked articles are stored in `localStorage` as JSON:
```javascript
const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
./mvnw clean package
# Deploy the generated JAR file
```

### Environment Variables
Set these in production:
- `NEWSAPI_KEY` - Your NewsAPI key
- `GROQ_API_KEY` - Your Groq API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for news data
- [Groq](https://groq.com/) for AI summaries
- [Material-UI](https://mui.com/) for components
- [Inter Font](https://rsms.me/inter/) for typography

---

**Built with ❤️ using modern web technologies**
