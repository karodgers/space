# Deployment Guide

## Overview

This guide covers the deployment process for the Space Waste Management System (SWMS) to production environments. The application is a client-side React SPA that can be deployed to any static web hosting service.

## Prerequisites

### System Requirements

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Access to deployment platform

### Environment Setup

Create production environment variables:

```bash
# .env.production
VITE_APP_TITLE="Space Waste Management System"
VITE_APP_VERSION="0.1.0"
VITE_API_BASE_URL=""  # Leave empty for client-side only
```

## Build Process

### Local Build

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run tests**:
   ```bash
   npm run test
   ```

3. **Create production build**:
   ```bash
   npm run build
   ```

4. **Verify build**:
   ```bash
   npm run preview
   ```

### Build Output

The build process creates:
- `dist/` directory with optimized assets
- Static HTML, CSS, and JavaScript files
- Source maps for debugging
- Compressed and minified code

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs']
        }
      }
    }
  }
})
```

## Deployment Platforms

### Netlify

1. **Connect repository**:
   - Sign up at [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Configure build settings

2. **Build settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18
   ```

3. **Environment variables**:
   ```
   VITE_APP_TITLE=Space Waste Management System
   VITE_APP_VERSION=0.1.0
   ```

4. **Deploy**:
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

### Vercel

1. **Connect repository**:
   - Sign up at [vercel.com](https://vercel.com)
   - Import GitHub repository

2. **Configure project**:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install"
   }
   ```

3. **Environment variables**:
   - Set in Vercel dashboard or `vercel.json`

4. **Deploy**:
   - Automatic deployments
   - Custom domains supported

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/space-waste-management-system"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload `dist/` contents to web server
   - Ensure correct MIME types for `.js` and `.css` files

3. **Configure server**:
   ```apache
   # .htaccess for Apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

## Environment Configuration

### Development vs Production

```typescript
// Environment-specific configuration
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true,
    analytics: false
  },
  production: {
    apiUrl: process.env.VITE_API_BASE_URL || '',
    debug: false,
    analytics: true
  }
};

const environment = process.env.NODE_ENV || 'development';
export default config[environment];
```

### Runtime Configuration

```typescript
// src/config.ts
export const config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'SWMS',
    version: import.meta.env.VITE_APP_VERSION || '0.1.0'
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || ''
  },
  features: {
    analytics: import.meta.env.PROD,
    debug: import.meta.env.DEV
  }
};
```

## CDN and Performance

### Asset Optimization

- **Code splitting**: Automatic chunking by Vite
- **Compression**: Gzip/Brotli enabled
- **Caching**: Long-term caching headers for static assets

### CDN Deployment

```javascript
// Example CDN configuration for assets
const cdnUrl = 'https://cdn.example.com/swms/';

// Load assets from CDN
const loadScript = (src) => {
  const script = document.createElement('script');
  script.src = cdnUrl + src;
  document.head.appendChild(script);
};
```

## Security Considerations

### HTTPS Configuration

- **SSL Certificate**: Required for production
- **HSTS Headers**: Enable HTTP Strict Transport Security
- **Secure Cookies**: If authentication is added later

### Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
">
```

### Security Headers

Configure server for security headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## Monitoring and Analytics

### Performance Monitoring

```typescript
// src/utils/performance.ts
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    // Track metrics
    console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart);
  }
};
```

### Error Tracking

```typescript
// src/utils/errorTracking.ts
export const initErrorTracking = () => {
  window.addEventListener('error', (event) => {
    // Send error to monitoring service
    console.error('Application error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    // Handle promise rejections
    console.error('Unhandled promise rejection:', event.reason);
  });
};
```

## Rollback Strategy

### Version Management

1. **Git Tags**: Tag releases for easy rollback
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. **Deployment History**: Keep deployment records
3. **Backup Strategy**: Maintain previous versions

### Emergency Rollback

1. **Identify issue**: Confirm deployment problem
2. **Revert code**: Deploy previous version
3. **Update routing**: Redirect to stable version
4. **Monitor recovery**: Verify system stability

## Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All routes work
- [ ] Real-time updates function
- [ ] Responsive design verified
- [ ] Console errors checked
- [ ] Performance metrics monitored
- [ ] Analytics configured
- [ ] SSL certificate valid
- [ ] DNS propagation complete

## Troubleshooting

### Common Deployment Issues

#### Build Failures

**Symptom**: Build process fails
**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite dist
npm install
npm run build
```

#### 404 Errors

**Symptom**: Page refreshes show 404
**Solution**: Configure server for SPA routing (see manual deployment section)

#### Performance Issues

**Symptom**: Slow loading times
**Solutions**:
- Enable compression
- Use CDN for assets
- Optimize bundle size
- Enable caching headers

#### HTTPS Issues

**Symptom**: Mixed content warnings
**Solution**:
- Ensure all assets load over HTTPS
- Update all URLs to HTTPS
- Configure HSTS headers

## Maintenance

### Update Process

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Install updates**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm run test
   ```

4. **Deploy**:
   ```bash
   npm run build
   # Upload dist/ to server or trigger CI/CD
   ```

### Monitoring

- **Uptime monitoring**: External service monitoring
- **Error tracking**: Log aggregation
- **Performance monitoring**: Response time tracking
- **User analytics**: Usage pattern analysis

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Supported Platforms**: Netlify, Vercel, GitHub Pages, Manual