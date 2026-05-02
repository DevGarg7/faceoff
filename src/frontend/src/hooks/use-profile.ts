import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

export function useProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  const query = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    profile: query.data ?? null,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
    hasProfile: !!query.data,
    refetch: query.refetch,
  };
}
