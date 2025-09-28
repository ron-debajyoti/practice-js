import express, { Request, Response } from 'express';
import cors from 'cors';
import { HelloResponse, HealthResponse, ShapeResponse } from './src/types';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/hello', (req: Request, res: Response<HelloResponse>) => {
  const response: HelloResponse = { message: 'Hello World!' };
  res.json(response);
});

app.get('/api/shape', (req: Request, res: Response<ShapeResponse>) => {
  const response: ShapeResponse = { 
    message: 'Shape', 
    data: [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1]] 
  };
  res.json(response);
});

app.get('/api/health', (req: Request, res: Response<HealthResponse>) => {
  const response: HealthResponse = { 
    status: 'OK', 
    message: 'Server is running' 
  };
  res.json(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
