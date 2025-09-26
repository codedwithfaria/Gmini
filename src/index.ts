import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { setupTaskHandlers } from './handlers/taskHandlers';
import { setupFeatureHandlers } from './handlers/featureHandlers';
import { setupProjectHandlers } from './handlers/projectHandlers';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Set up MCP handlers
setupTaskHandlers(app);
setupFeatureHandlers(app);
setupProjectHandlers(app);

app.listen(port, () => {
  console.log(`Task Orchestrator MCP Server running on port ${port}`);
});