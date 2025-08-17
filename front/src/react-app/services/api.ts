import { Employee, CreateEmployee, UpdateEmployee } from '@/shared/types';
import { getToken, clearToken } from '@/shared/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as any),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearToken();
    window.location.replace('/login');
    throw new Error('Unauthorized');
  }

  const data = await res
    .json()
    .catch(() => ({} as any));

  if (!res.ok) {
    throw new Error(data?.message || `HTTP ${res.status}`);
  }
  return data as T;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || response.statusText);
  }
  return response.json();
}

export const employeeApi = {
  async getAll(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`);
    return handleResponse<Employee[]>(response);
  },

  async getById(id: number): Promise<Employee> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    return handleResponse<Employee>(response);
  },

  async create(employee: CreateEmployee): Promise<Employee> {
    return apiFetch<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  },

  async update(id: number, employee: Partial<UpdateEmployee>): Promise<Employee> {
    return apiFetch<Employee>(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  },

  async delete(id: number): Promise<void> {
    await apiFetch<void>(`/employees/${id}`, {
      method: 'DELETE',
    });
  },
}
