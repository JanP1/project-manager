import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/dbConnection.ts';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dynamic imports of routes
const projectRouter = await import('./routes/projectRouter.ts');
const columnRouter = await import('./routes/columnRouter.ts');
const taskRouter = await import('./routes/taskRouter.ts');

async function start() {
  // Load environment variables
  dotenv.config({ path: './.env' });

  // Connect to the MongoDB database
  await connectToDatabase();

  // Initialize Express app
  const app = express();

  // Middleware setup
  app.use(bodyParser.json({ limit: '10kb' }));

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN as string,
      credentials: true,
    })
  );

  // Routes mounting
  app.use('/projects', projectRouter.default);
  app.use('/columns', columnRouter.default);
  app.use('/tasks', taskRouter.default);

  // Start server
  const port = process.env.HTTP_PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start();
