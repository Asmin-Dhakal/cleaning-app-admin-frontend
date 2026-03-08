import { apiClient } from "../../../shared/api/apiClient";
import type { Client, ActivationResponse } from "../types/client";

const BASE_URL = "/admin";

export const clientAdminApi = {
  getClients: () => apiClient.get<Client[]>(`${BASE_URL}/list/clients`),

  getUnactivatedClients: () =>
    apiClient.get<Client[]>(`${BASE_URL}/list/clients/unactivated`),

  getDeactivatedClients: () =>
    apiClient.get<Client[]>(`${BASE_URL}/list/clients/deactivated`),

  activateClient: (clientId: string) =>
    apiClient.patch<ActivationResponse>(
      `${BASE_URL}/activation/client/${clientId}/activate`,
    ),

  deactivateClient: (clientId: string) =>
    apiClient.patch<ActivationResponse>(
      `${BASE_URL}/activation/client/${clientId}/deactivate`,
    ),
};
