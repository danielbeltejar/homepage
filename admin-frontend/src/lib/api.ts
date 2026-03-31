const API_BASE = "/api";

let authToken: string | null = null;

export function setToken(token: string | null) {
  authToken = token;
}

export function getToken(): string | null {
  return authToken;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    setToken(null);
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export interface Post {
  filename: string;
  title: string;
  date: string | null;
  author: string | null;
  content?: string | null;
}

export interface PostList {
  posts: Post[];
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const api = {
  login: (username: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getMe: () => request<{ username: string }>("/auth/me"),

  listPosts: () => request<PostList>("/posts"),

  getPost: (filename: string) => request<Post>(`/posts/${filename}`),

  createPost: (data: {
    title: string;
    date: string;
    author: string;
    content: string;
    filename?: string;
  }) =>
    request<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updatePost: (
    filename: string,
    data: { title: string; date: string; author: string; content: string }
  ) =>
    request<Post>(`/posts/${filename}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deletePost: (filename: string) =>
    request<void>(`/posts/${filename}`, { method: "DELETE" }),
};
