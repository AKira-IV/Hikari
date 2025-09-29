export interface LoginRequest {
  email: string;
  password: string;
  tenantSubdomain: string;
  captchaToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantSubdomain: string;
  captchaToken: string;
  phone?: string;
  address?: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenant: {
    id: string;
    name: string;
    subdomain: string;
  };
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUser;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUser;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: unknown;
}
