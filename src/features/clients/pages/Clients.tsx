import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../app/providers/ThemeProvider";
import {
  useActiveClients,
  useActivateClient,
  useDeactivatedClients,
  useDeactivateClient,
  usePendingClients,
} from "../hooks/useClients";
import type { ClientTab } from "../types/client";

export const Clients = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [tab, setTab] = useState<ClientTab>("pending");

  const activeQuery = useActiveClients();
  const pendingQuery = usePendingClients();
  const deactivatedQuery = useDeactivatedClients();

  const activateMutation = useActivateClient();
  const deactivateMutation = useDeactivateClient();

  const currentData = useMemo(() => {
    if (tab === "active") return activeQuery.data ?? [];
    if (tab === "deactivated") return deactivatedQuery.data ?? [];
    return pendingQuery.data ?? [];
  }, [tab, activeQuery.data, pendingQuery.data, deactivatedQuery.data]);

  const isLoading =
    (tab === "active" && activeQuery.isLoading) ||
    (tab === "pending" && pendingQuery.isLoading) ||
    (tab === "deactivated" && deactivatedQuery.isLoading);

  const isError =
    (tab === "active" && activeQuery.isError) ||
    (tab === "pending" && pendingQuery.isError) ||
    (tab === "deactivated" && deactivatedQuery.isError);

  const isMutating = activateMutation.isPending || deactivateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
          {t("clients.title")}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <TabButton
          active={tab === "pending"}
          label={t("clients.tabs.pending")}
          count={pendingQuery.data?.length ?? 0}
          onClick={() => setTab("pending")}
        />
        <TabButton
          active={tab === "active"}
          label={t("clients.tabs.active")}
          count={activeQuery.data?.length ?? 0}
          onClick={() => setTab("active")}
        />
        <TabButton
          active={tab === "deactivated"}
          label={t("clients.tabs.deactivated")}
          count={deactivatedQuery.data?.length ?? 0}
          onClick={() => setTab("deactivated")}
        />
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        }}
      >
        {isLoading ? (
          <div className="p-6" style={{ color: theme.colors.textMuted }}>
            {t("clients.loading")}
          </div>
        ) : isError ? (
          <div className="p-6" style={{ color: theme.colors.danger }}>
            {t("clients.error")}
          </div>
        ) : currentData.length === 0 ? (
          <div className="p-6" style={{ color: theme.colors.textMuted }}>
            {t("clients.empty")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead
                style={{
                  backgroundColor: theme.colors.surfaceElevated,
                  color: theme.colors.textMuted,
                }}
              >
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.name")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.email")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.phone")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.createdAt")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.status")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {t("clients.columns.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((client) => {
                  const status = client.isActive
                    ? t("clients.status.active")
                    : t("clients.status.pending");

                  return (
                    <tr
                      key={client.id}
                      className="border-t"
                      style={{ borderColor: theme.colors.border }}
                    >
                      <td
                        className="px-4 py-3"
                        style={{ color: theme.colors.text }}
                      >
                        {client.firstName} {client.lastName}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {client.email}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {client.phone || "-"}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {new Date(client.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: client.isActive
                              ? `${theme.colors.success}22`
                              : `${theme.colors.warning}22`,
                            color: client.isActive
                              ? theme.colors.success
                              : theme.colors.warning,
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {!client.isActive && (
                            <button
                              className="px-3 py-1 rounded-md text-sm font-medium"
                              style={{
                                backgroundColor: `${theme.colors.success}20`,
                                color: theme.colors.success,
                                border: `1px solid ${theme.colors.success}55`,
                              }}
                              disabled={isMutating}
                              onClick={() => activateMutation.mutate(client.id)}
                            >
                              {t("clients.actions.activate")}
                            </button>
                          )}
                          {client.isActive && tab !== "pending" && (
                            <button
                              className="px-3 py-1 rounded-md text-sm font-medium"
                              style={{
                                backgroundColor: `${theme.colors.danger}20`,
                                color: theme.colors.danger,
                                border: `1px solid ${theme.colors.danger}55`,
                              }}
                              disabled={isMutating}
                              onClick={() =>
                                deactivateMutation.mutate(client.id)
                              }
                            >
                              {t("clients.actions.deactivate")}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

type TabButtonProps = {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
};

const TabButton = ({ active, label, count, onClick }: TabButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-semibold"
      style={{
        backgroundColor: active ? theme.colors.accent : theme.colors.surface,
        color: active ? theme.colors.textInverse : theme.colors.text,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {label} ({count})
    </button>
  );
};
