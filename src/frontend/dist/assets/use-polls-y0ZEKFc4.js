import { c as createLucideIcon } from "./Layout-DFJinAMo.js";
import { Q as QueryObserver, i as infiniteQueryBehavior, h as hasPreviousPage, g as hasNextPage, k as useBaseQuery, u as useActor, l as useQuery, d as createActor } from "./index-ovTHFw25.js";
var InfiniteQueryObserver = class extends QueryObserver {
  constructor(client, options) {
    super(client, options);
  }
  bindMethods() {
    super.bindMethods();
    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  }
  setOptions(options) {
    super.setOptions({
      ...options,
      behavior: infiniteQueryBehavior()
    });
  }
  getOptimisticResult(options) {
    options.behavior = infiniteQueryBehavior();
    return super.getOptimisticResult(options);
  }
  fetchNextPage(options) {
    return this.fetch({
      ...options,
      meta: {
        fetchMore: { direction: "forward" }
      }
    });
  }
  fetchPreviousPage(options) {
    return this.fetch({
      ...options,
      meta: {
        fetchMore: { direction: "backward" }
      }
    });
  }
  createResult(query, options) {
    var _a, _b;
    const { state } = query;
    const parentResult = super.createResult(query, options);
    const { isFetching, isRefetching, isError, isRefetchError } = parentResult;
    const fetchDirection = (_b = (_a = state.fetchMeta) == null ? void 0 : _a.fetchMore) == null ? void 0 : _b.direction;
    const isFetchNextPageError = isError && fetchDirection === "forward";
    const isFetchingNextPage = isFetching && fetchDirection === "forward";
    const isFetchPreviousPageError = isError && fetchDirection === "backward";
    const isFetchingPreviousPage = isFetching && fetchDirection === "backward";
    const result = {
      ...parentResult,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: hasNextPage(options, state.data),
      hasPreviousPage: hasPreviousPage(options, state.data),
      isFetchNextPageError,
      isFetchingNextPage,
      isFetchPreviousPageError,
      isFetchingPreviousPage,
      isRefetchError: isRefetchError && !isFetchNextPageError && !isFetchPreviousPageError,
      isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
    };
    return result;
  }
};
function useInfiniteQuery(options, queryClient) {
  return useBaseQuery(
    options,
    InfiniteQueryObserver
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function usePublicFeed() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useInfiniteQuery({
    queryKey: ["publicFeed"],
    queryFn: async ({ pageParam }) => {
      if (!actor) return [];
      return actor.getPublicFeed(BigInt(pageParam));
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 10) return void 0;
      return allPages.length;
    },
    enabled: !!actor && !actorFetching
  });
}
function useMyPolls() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myPolls"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPolls();
    },
    enabled: !!actor && !actorFetching
  });
}
function usePoll(pollId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["poll", pollId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPoll(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId
  });
}
function useHasVoted(pollId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["hasVoted", pollId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasVoted(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId
  });
}
function usePollResults(pollId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["results", pollId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResults(pollId);
    },
    enabled: !!actor && !actorFetching && !!pollId,
    refetchInterval: 5e3
  });
}
export {
  Clock as C,
  Trophy as T,
  usePublicFeed as a,
  usePoll as b,
  usePollResults as c,
  useMyPolls as d,
  useHasVoted as u
};
