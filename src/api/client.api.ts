import { Meta, Paged } from "@/types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type Envelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
};

export async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<Envelope<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  let body: Envelope<T> | null = null;
  try {
    body = await res.json();
  } catch {}
  if (!res.ok || body?.success === false) {
    throw new ApiError(body?.message ?? "Request failed", res.status);
  }
  return body as Envelope<T>;
}

export type Query = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  [k: string]: string | number | boolean | undefined;
};

export const qs = (q: Query = {}) => {
  const s = new URLSearchParams();
  Object.entries(q).forEach(([k, v]) => {
    if (v !== undefined && v !== "") s.set(k, String(v));
  });
  const t = s.toString();
  return t ? `?${t}` : "";
};

export const list = async <T>(path: string, q?: Query): Promise<Paged<T>> => {
  const r = await request<T[]>(`${path}${qs(q)}`);
  return {
    data: r.data,
    meta: r.meta ?? {
      page: 1,
      limit: r.data.length,
      total: r.data.length,
      totalPages: 1,
    },
  };
};
