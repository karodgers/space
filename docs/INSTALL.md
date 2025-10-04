# Installation and Setup Guide

## Prerequisites

Before installing the Space Waste Management System, ensure your system meets the following requirements:

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Operating System** | Linux, macOS, Windows 10+ | Linux or macOS |
| **Node.js** | 18.0.0 | 20.x.x |
| **npm** | 8.0.0 | 10.x.x |
| **Memory (RAM)** | 4 GB | 8 GB |
| **Storage** | 500 MB | 1 GB |
| **Browser** | Chrome 90+, Firefox 88+, Safari 14+ | Latest Chrome |

### Software Dependencies

1. **Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (for cloning repository)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

## Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-organization/space-waste-management-system.git

# Navigate to the project directory
cd space-waste-management-system
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# Verify installation
npm list --depth=0
```

This command will install all required dependencies as specified in `package.json`.

### Step 3: Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
# Create environment file
touch .env
```

Add the following configuration (adjust values as needed):

```env
# Application Configuration
VITE_APP_TITLE="Space Waste Management System"
VITE_APP_VERSION="0.1.0"

# Development Configuration
VITE_DEV_PORT=5173
VITE_DEV_HOST=localhost

# Optional: API endpoints (for future backend integration)
# VITE_API_BASE_URL=https://api.example.com
```

### Step 4: Verify Installation

```bash
# Check that all dependencies are installed
npm run build

# If build succeeds, installation is complete
```

## Running the Application

### Development Mode

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:5173
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## Configuration Options

### Build Configuration

The build process can be customized by modifying `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Customizing the Application

#### Theme Customization

Modify `src/styles/globals.css` to customize colors and styling:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Add custom CSS variables */
}
```

#### Component Customization

UI components can be customized by modifying the component files in `src/components/ui/`.

## Troubleshooting

### Common Issues

#### 1. Node.js Version Issues

**Error**: `Node.js version X.X.X is not supported`

**Solution**:
```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 20
nvm install 20
nvm use 20
```

#### 2. Permission Errors

**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

#### 3. Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 5174
```

#### 4. Build Failures

**Error**: `Build failed with exit code 1`

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Performance Issues

If the application runs slowly:

1. **Enable build optimizations**:
   ```bash
   npm run build -- --mode production
   ```

2. **Check browser developer tools** for performance bottlenecks

3. **Ensure adequate system resources** (RAM, CPU)

## Deployment

For production deployment, see the [Deployment Guide](DEPLOYMENT.md).

## Support

If you encounter issues not covered here:

1. Check the [README.md](../README.md) for additional information
2. Review existing GitHub issues
3. Create a new issue with detailed error information

## System Verification

After installation, verify the system is working correctly:

1. **Application loads**: Check that the main interface displays
2. **Navigation works**: Verify all tabs are accessible
3. **Real-time updates**: Confirm metrics update appropriately
4. **Responsive design**: Test on different screen sizes

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Compatibility**: Node.js 18+, npm 8+