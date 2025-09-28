// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  status?: string;
}

export interface HelloResponse extends ApiResponse {
  message: 'Hello World!';
}

export interface ShapeResponse extends ApiResponse {
  message: 'Shape';
  data: [[number, number, number], [number, number, number], [number, number, number], [number, number, number]];
}

export interface HealthResponse extends ApiResponse {
  status: 'OK';
  message: 'Server is running';
}

// API Error Types
export interface ApiError {
  message: string;
  statusCode?: number;
}
