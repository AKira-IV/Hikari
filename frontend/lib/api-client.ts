import { appConfig } from '@/config/site';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse
} from './types';

// Token storage utilities
export const tokenStorage = {
  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  getRefreshToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  },

  clearTokens: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    tokenStorage.clearTokens();
    return null;
  }

  try {
    const response = await apiFetch<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    tokenStorage.setTokens(response.access_token, response.refresh_token);
    return response.access_token;
  } catch (error) {
    tokenStorage.clearTokens();
    // Redirect to login if refresh fails
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = appConfig.apiBaseUrl.replace(/\/$/, '');

  let accessToken = tokenStorage.getAccessToken();

  // Add authorization header if we have a token
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  if (accessToken) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  // If 401 and we have a refresh token, try to refresh
  if (response.status === 401 && tokenStorage.getRefreshToken() && !path.includes('/auth/refresh')) {
    if (!isRefreshing) {
      isRefreshing = true;

      const newToken = await refreshAccessToken();
      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);

        // Retry original request with new token
        (headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(`${baseUrl}${path}`, {
          ...options,
          headers,
        });
      }
    } else {
      // If already refreshing, wait for it to complete
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
          fetch(`${baseUrl}${path}`, {
            ...options,
            headers,
          })
          .then(res => res.json())
          .then(resolve)
          .catch(reject);
        });
      });
    }
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson && body?.message ? body.message : 'Solicitud fallida';
    throw new Error(message);
  }

  return body as T;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Store tokens after successful login
  tokenStorage.setTokens(response.access_token, response.refresh_token);

  return response;
}

export async function register(payload: RegisterRequest) {
  return apiFetch<Pick<LoginResponse, 'user'>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<void> {
  const refreshToken = tokenStorage.getRefreshToken();

  if (refreshToken) {
    try {
      await apiFetch('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      // Continue with logout even if server request fails
      console.warn('Logout request failed:', error);
    }
  }

  tokenStorage.clearTokens();
}

export async function logoutAllSessions(): Promise<void> {
  try {
    await apiFetch('/auth/logout-all', {
      method: 'POST',
    });
  } finally {
    tokenStorage.clearTokens();
  }
}
