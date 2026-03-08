import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientAdminApi } from "../api/clientAdminApi";

export const CLIENT_QUERY_KEYS = {
    active: ["clients", "active"] as const,
    pending: ["clients", "pending"] as const,
    deactivated: ["clients", "deactivated"] as const,
};

export const useActiveClients = () => {
    return useQuery({
        queryKey: CLIENT_QUERY_KEYS.active,
        queryFn: async () => (await clientAdminApi.getClients()).data,
    });
};

export const usePendingClients = () => {
    return useQuery({
        queryKey: CLIENT_QUERY_KEYS.pending,
        queryFn: async () => (await clientAdminApi.getUnactivatedClients()).data,
    });
};

export const useDeactivatedClients = () => {
    return useQuery({
        queryKey: CLIENT_QUERY_KEYS.deactivated,
        queryFn: async () => (await clientAdminApi.getDeactivatedClients()).data,
    });
};

export const useActivateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (clientId: string) => clientAdminApi.activateClient(clientId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.active });
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.pending });
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.deactivated });
        },
    });
};

export const useDeactivateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (clientId: string) => clientAdminApi.deactivateClient(clientId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.active });
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.pending });
            queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.deactivated });
        },
    });
};
