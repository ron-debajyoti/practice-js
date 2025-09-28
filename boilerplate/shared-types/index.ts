// Shared types between frontend and backend
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  status?: string;
}

export interface HelloResponse extends ApiResponse {
  message: 'Hello World!';
}

export interface HealthResponse extends ApiResponse {
  status: 'OK';
  message: 'Server is running';
}

export interface ApiError {
  message: string;
  statusCode?: number;
  stack?: string;
}
