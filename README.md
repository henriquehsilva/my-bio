# HenriqueSilva.dev - Personal Hub

A stunning, dark-themed personal portfolio hub designed as a digital magazine showcasing your online presence across multiple platforms. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark, Minimal Design**: Pure black background with high-contrast typography using Roboto font
- **Magazine-Style Layout**: Professional, typography-driven sections with smooth animations
- **Multi-Platform Integration**: Displays content from Twitter/X, Instagram, GitHub, YouTube, Substack, and Medium
- **Responsive Design**: Fully responsive from mobile to ultrawide desktop displays
- **Smooth Animations**: Scroll-triggered reveals, hover effects, and micro-interactions
- **Performance Optimized**: Lazy loading, optimized images, and production-ready build

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Fixed navbar with social links
│   ├── Hero.tsx                # Hero section with Instagram carousel
│   ├── LatestTweet.tsx         # Latest tweet display
│   ├── StatsStrip.tsx          # Social media statistics
│   ├── LatestThoughts.tsx      # Latest Substack post
│   ├── FeaturedProjects.tsx    # GitHub projects showcase
│   ├── LatestStudyNote.tsx     # Latest Medium article
│   └── LatestGameplay.tsx      # Latest YouTube videos
├── services/
│   ├── twitter.service.ts      # Twitter/X API integration
│   ├── instagram.service.ts    # Instagram API integration
│   ├── substack.service.ts     # Substack RSS integration
│   ├── github.service.ts       # GitHub API integration
│   ├── medium.service.ts       # Medium RSS integration
│   ├── youtube.service.ts      # YouTube API integration
│   └── stats.service.ts        # Social stats aggregation
├── types/
│   └── index.ts                # TypeScript type definitions
├── hooks/
│   └── useScrollReveal.ts      # Scroll animation hook
└── App.tsx                     # Main application component
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables (see Configuration section below)

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Configuration

### Environment Variables

Create or update the `.env` file in the root directory with your API credentials. All variables are optional - the application will use placeholder content when API keys are not configured.

#### Twitter/X API

To display your latest tweets:

1. Apply for Twitter Developer access at https://developer.twitter.com
2. Create a new app and generate API keys
3. Add to `.env`:

```env
VITE_TWITTER_API_KEY=your_twitter_api_key_here
VITE_API_BASE_URL=your_api_base_url_here
```

**Note**: You'll need to create a backend API endpoint to fetch tweets securely, as Twitter API requires server-side authentication.

#### Instagram API

To display your Instagram photos in the hero carousel:

1. Create a Facebook App at https://developers.facebook.com
2. Add Instagram Basic Display product
3. Generate a User Access Token
4. Add to `.env`:

```env
VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
```

**Note**: Instagram tokens expire and need to be refreshed periodically.

#### GitHub API

To display your repositories and stats:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate a new token with `public_repo` scope
3. Add to `.env`:

```env
VITE_GITHUB_USERNAME=your_github_username
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

**Note**: The token is optional but recommended to avoid rate limiting.

#### YouTube API

To display your latest videos:

1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create API credentials (API Key)
5. Find your channel ID (visit your channel, check URL)
6. Add to `.env`:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
```

#### Substack

To display your latest Substack posts:

1. Add your Substack URL to `.env`:

```env
VITE_SUBSTACK_URL=https://yoursubstack.substack.com
```

**Note**: Uses your public Substack API endpoint. No authentication required.

#### Medium

To display your latest Medium articles:

1. Add your Medium username to `.env`:

```env
VITE_MEDIUM_USERNAME=your_medium_username
```

**Note**: Uses RSS2JSON service to fetch your Medium RSS feed. No authentication required.

## Customization

### Update Personal Information

1. **Profile Photo**: Replace the image URL in `src/components/Navigation.tsx:58`
2. **Name and Tagline**: Update in `src/components/Hero.tsx`
3. **Social Links**: Update URLs in `src/components/Navigation.tsx:7-17`

### Styling

The project uses Tailwind CSS for styling. The main color scheme is:

- Background: Pure black (`#000000`)
- Text: White and gray shades
- Borders: Subtle gray tones
- Font: Roboto (light, regular, medium, bold)

To customize, edit:
- `src/index.css` - Global styles and animations
- `tailwind.config.js` - Tailwind configuration
- Component files - Individual component styles

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Add the `reveal` class for scroll animations
4. Follow the existing design patterns for consistency

## Performance Optimization

The application includes several optimizations:

- Image lazy loading via Pexels CDN
- Smooth scroll behavior with CSS
- Intersection Observer for scroll animations
- Production build optimization with Vite
- Minimal dependencies

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

The application can be deployed to any static hosting service:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

## Troubleshooting

### API Rate Limits

If you encounter rate limiting:
- GitHub: Add a personal access token
- YouTube: Check your API quota in Google Cloud Console
- Twitter: Implement caching in your backend

### Instagram Token Expiration

Instagram access tokens expire after 60 days. You'll need to:
1. Refresh the token using the Instagram API
2. Update the `.env` file with the new token

### CORS Issues

If you encounter CORS errors:
- Twitter/X requires a backend proxy
- Instagram works with user access tokens
- Other services should work directly or via RSS

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation for each service
3. Ensure all environment variables are correctly configured

## Acknowledgments

- Stock photos from Pexels
- Built with React, TypeScript, and Tailwind CSS
- Icons and UI elements are text-only (no icon libraries)
