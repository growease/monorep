// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Health status types
export interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: Date;
  uptime?: number;
  services?: {
    database?: 'healthy' | 'unhealthy';
    [key: string]: 'healthy' | 'unhealthy' | undefined;
  };
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

// Pagination
export interface PaginationInput {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

