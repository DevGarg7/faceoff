import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function usePublicFeed() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useInfiniteQuery({
    queryKey: ["publicFeed"],
    queryFn: async ({ pageParam }) => {
      if (!actor) return [];
      return actor.getPublicFeed(BigInt(pageParam as number));
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return allPages.length;
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useMyPolls() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["myPolls"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPolls();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function usePoll(pollId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["poll", pollId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPoll(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId,
  });
}

export function useHasVoted(pollId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["hasVoted", pollId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasVoted(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId,
  });
}

export function usePollResults(pollId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["results", pollId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResults(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId,
    refetchInterval: 5000,
  });
}
