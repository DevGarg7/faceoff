import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const logout = () => {
    clear();
    queryClient.clear();
  };

  const principal = identity?.getPrincipal();

  return {
    isAuthenticated,
    isLoading: isInitializing || isLoggingIn,
    isInitializing,
    isLoggingIn,
    principal,
    login,
    logout,
    loginStatus,
    identity,
  };
}
