import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import winston from 'winston';

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

const app = express();
const PORT = 8080;

// Service URLs from environment variables
const MEMORY_URL = process.env.MEMORY_URL || 'http://memory:3000';
const PLAYWRIGHT_URL = process.env.PLAYWRIGHT_URL || 'http://playwright:3000';
const NODE_SANDBOX_URL = process.env.NODE_SANDBOX_URL || 'http://node-sandbox:3000';

// Proxy middleware options
const proxyOptions = {
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
        logger.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy Error', message: err.message });
    }
};

// Route handlers for different MCP services
app.use('/memory', createProxyMiddleware({
    ...proxyOptions,
    target: MEMORY_URL,
    pathRewrite: { '^/memory': '' }
}));

app.use('/playwright', createProxyMiddleware({
    ...proxyOptions,
    target: PLAYWRIGHT_URL,
    pathRewrite: { '^/playwright': '' }
}));

app.use('/node-sandbox', createProxyMiddleware({
    ...proxyOptions,
    target: NODE_SANDBOX_URL,
    pathRewrite: { '^/node-sandbox': '' }
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        services: {
            memory: MEMORY_URL,
            playwright: PLAYWRIGHT_URL,
            nodeSandbox: NODE_SANDBOX_URL
        }
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Gmini MCP Proxy Server running on port ${PORT}`);
});