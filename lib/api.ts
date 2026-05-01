/**
 * API Utility Functions
 * Handles API requests with NextAuth authentication
 */

const BIRTH_DEATH_SERVICE_BASE_URL =
  process.env.BIRTH_DEATH_SERVICE_BASE_URL || "http://localhost:5004";

interface ApiRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Get authentication token from NextAuth session
 */
const getAuthToken = async (): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      // Client-side: Use getSession from next-auth/react
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      return session?.accessToken || null;
    }
  } catch (error) {
    console.error("Failed to get auth token:", error);
  }
  return null;
};

/**
 * Generic API request handler
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { requiresAuth = true, headers = {}, ...fetchOptions } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  // Add authorization header if required
  if (requiresAuth) {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("Authentication token not found");
    }
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      headers: requestHeaders,
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API Error: ${response.status} ${response.statusText}`,
      );
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}

/**
 * Convenience method for GET requests
 */
export async function apiGet<T>(
  endpoint: string,
  options?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * Convenience method for POST requests
 */
export async function apiPost<T>(
  endpoint: string,
  data?: any,
  options?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for PUT requests
 */
export async function apiPut<T>(
  endpoint: string,
  data?: any,
  options?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for DELETE requests
 */
export async function apiDelete<T>(
  endpoint: string,
  options?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Get full API URL for birth-death service
 */
export function getBirthDeathServiceUrl(path: string): string {
  return `${BIRTH_DEATH_SERVICE_BASE_URL}${path}`;
}
