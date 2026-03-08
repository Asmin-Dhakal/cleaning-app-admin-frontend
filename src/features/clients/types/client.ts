export interface Client {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  emailVerified: boolean;
}

export interface ActivationResponse {
  message: string;
}

export type ClientTab = "active" | "pending" | "deactivated";
