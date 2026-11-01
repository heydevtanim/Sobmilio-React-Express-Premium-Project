/**
 * Vercel Speed Insights Middleware
 * 
 * This middleware injects Vercel Speed Insights tracking into HTML responses.
 * 
 * NOTE: This Express API currently serves JSON responses only. Speed Insights
 * is a client-side performance monitoring tool that measures Core Web Vitals
 * and requires HTML pages to function.
 * 
 * Usage:
 * - If you add HTML routes to this server, apply this middleware to those routes
 * - For the React client app, install @vercel/speed-insights in the client directory
 *   and add <SpeedInsights /> component to your React app
 * 
 * Example for HTML routes:
 * import { speedInsightsMiddleware } from './middleware/speed-insights.js';
 * app.use('/docs', speedInsightsMiddleware);
 * 
 * @see https://vercel.com/docs/speed-insights/quickstart
 */

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Middleware to inject Speed Insights script into HTML responses
 * This is useful if the Express server serves any HTML pages
 */
export const speedInsightsMiddleware = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Only inject into HTML responses
    if (res.get('Content-Type')?.includes('text/html') && typeof data === 'string') {
      // Inject Speed Insights script before closing </body> tag
      const speedInsightsScript = `
        <script type="module">
          import { injectSpeedInsights } from '/@vercel/speed-insights';
          injectSpeedInsights();
        </script>
      `;
      data = data.replace('</body>', `${speedInsightsScript}</body>`);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

/**
 * Static middleware to serve Speed Insights module files
 * This allows the client to import the Speed Insights module
 */
export const speedInsightsStaticMiddleware = express.static(
  path.join(__dirname, '../../node_modules/@vercel/speed-insights'),
  {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript');
      }
    }
  }
);

/**
 * Configure Speed Insights routes on the Express app
 * 
 * @param {express.Application} app - Express application instance
 */
export function configureSpeedInsights(app) {
  // Serve Speed Insights module files
  app.use('/@vercel/speed-insights', speedInsightsStaticMiddleware);
  
  // Note: The injection middleware is NOT applied globally since this API
  // serves JSON responses. Apply it selectively to HTML routes if needed:
  // app.use('/your-html-route', speedInsightsMiddleware);
}
