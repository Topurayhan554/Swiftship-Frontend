import {
  AdminParcel,
  AdminPayment,
  AdminReview,
  AdminStats,
  AdminUser,
  AuditLog,
  ParcelStatus,
} from "@/types";
import { list, Query, request } from "./client.api";

export const adminApi = {
  stats: async () => (await request<AdminStats>("/admin/stats")).data,

  parcels: (q?: Query) => list<AdminParcel>("/parcels", q),
  assignCourier: (id: string, courierId: string) =>
    request(`/parcels/${id}/assign`, {
      method: "POST",
      body: JSON.stringify({ courierId }),
    }),
  updateParcelStatus: (id: string, status: ParcelStatus, note?: string) =>
    request(`/parcels/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    }),
  cancelParcel: (id: string) => request(`/parcels/${id}`, { method: "DELETE" }),

  users: (q?: Query) => list<AdminUser>("/users", q),
  setUserBlocked: (id: string, isBlocked: boolean) =>
    request(`/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isBlocked }),
    }),

  payments: (q?: Query) => list<AdminPayment>("/payments", q),

  reviews: (q?: Query) => list<AdminReview>("/reviews", q),
  deleteReview: (id: string) => request(`/reviews/${id}`, { method: "DELETE" }),

  auditLogs: (q?: Query) => list<AuditLog>("/audit-logs", q),
};

export type ListQuery = Query;
