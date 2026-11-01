# Vercel Speed Insights Configuration

This document explains how Vercel Speed Insights has been configured for the Sobmilio API server.

## Package Installation

The `@vercel/speed-insights` package has been installed:

```bash
npm install @vercel/speed-insights
```

## Current Implementation

### What's Configured

1. **Middleware Module** (`src/middleware/speed-insights.js`):
   - Provides utilities for injecting Speed Insights into HTML responses
   - Serves Speed Insights module files at `/@vercel/speed-insights`
   - Ready to use if HTML pages are added to this server

2. **Server Configuration** (`src/index.js`):
   - Imports and configures Speed Insights middleware
   - Makes the Speed Insights module available via static route

### Important Notes

**This is a JSON REST API server** that currently serves no HTML pages. Speed Insights is a **client-side performance monitoring tool** that measures Core Web Vitals (LCP, FID, CLS, etc.) and requires HTML pages rendered in a browser to function.

## Usage Scenarios

### Scenario 1: If You Add HTML Routes to This Server

If you decide to serve HTML pages from this Express server, you can use the middleware:

```javascript
import { speedInsightsMiddleware } from './middleware/speed-insights.js';

// Apply to specific HTML routes
app.get('/docs', speedInsightsMiddleware, (req, res) => {
  res.send('<html><body>Documentation</body></html>');
});
```

Or manually inject in your HTML template:

```html
<!DOCTYPE html>
<html>
<body>
  <!-- Your content -->
  
  <script type="module">
    import { injectSpeedInsights } from '/@vercel/speed-insights';
    injectSpeedInsights();
  </script>
</body>
</html>
```

### Scenario 2: For the React Client (Recommended)

Since this is a monorepo with a React client, the proper place to use Speed Insights is in the **client application**:

1. Install in the client directory:
   ```bash
   cd ../client
   npm install @vercel/speed-insights
   ```

2. Add to your React app (e.g., in `src/main.jsx` or `src/App.jsx`):
   ```javascript
   import { SpeedInsights } from '@vercel/speed-insights/react';
   
   function App() {
     return (
       <>
         {/* Your app content */}
         <SpeedInsights />
       </>
     );
   }
   ```

## How Speed Insights Works

When deployed to Vercel:
- The library automatically detects the Vercel environment
- It collects Core Web Vitals metrics from actual user sessions
- Data appears in your Vercel project dashboard under "Speed Insights"
- No additional configuration is needed beyond adding the component/script

In development:
- The library detects it's running locally and won't send data
- Console messages may indicate it's in development mode

## Verification

After deployment to Vercel:
1. Visit your deployed site
2. Open browser DevTools → Network tab
3. Look for requests to `/_vercel/speed-insights/vitals`
4. Check your Vercel dashboard for Speed Insights data (may take a few hours)

## Resources

- [Official Documentation](https://vercel.com/docs/speed-insights/quickstart)
- [Core Web Vitals Explained](https://web.dev/vitals/)
- [React Integration Guide](https://vercel.com/docs/speed-insights/quickstart#react)
