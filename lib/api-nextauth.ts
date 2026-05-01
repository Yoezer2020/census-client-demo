/**
 * API Utility Functions (NextAuth Compatible)
 * Handles API requests with NextAuth session authentication
 */

const BIRTH_DEATH_SERVICE_BASE_URL =
  process.env.BIRTH_DEATH_SERVICE_BASE_URL || "http://localhost:5004";

interface ApiRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Get authentication token from NextAuth session or localStorage fallback
 */
const getAuthToken = async (): Promise<string | null> => {
  // Try NextAuth first (if available)
  try {
    if (typeof window === "undefined") {
      // Server-side: Would use getServerSession (requires setup)
      // const { getServerSession } = await import("next-auth/next");
      // const session = await getServerSession(authOptions);
      // return session?.accessToken || null;
      return null; // Return null until NextAuth is set up
    } else {
      // Client-side: Try NextAuth session
      try {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        if (session?.accessToken) {
          return session.accessToken as string;
        }
      } catch (e) {
        // NextAuth not available, fall through to localStorage
        console.log("NextAuth not available, using localStorage fallback");
      }
    }
  } catch (error) {
    console.log("NextAuth session check failed, using localStorage");
  }

  // Fallback to localStorage (current implementation)
  if (typeof window === "undefined") return null;

  // Try to get NDI user token first
  const ndiUser = localStorage.getItem("ndi_user");
  if (ndiUser) {
    try {
      const parsed = JSON.parse(ndiUser);
      if (parsed.token || parsed.accessToken) {
        return parsed.token || parsed.accessToken;
      }
    } catch (e) {
      console.error("Failed to parse NDI user token", e);
    }
  }

  // Fallback to direct token
  return localStorage.getItem("auth_token");
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
      throw new Error("Authentication token not found. Please log in.");
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
