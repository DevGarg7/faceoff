import type { backendInterface, PollPublic, PollSummary, ProfilePublic, VoteTally } from "../backend";
import { PollCategory } from "../backend";

const sampleVotes: VoteTally[] = [
  { faceNumber: BigInt(1), count: BigInt(580), percentage: 58 },
  { faceNumber: BigInt(2), count: BigInt(120), percentage: 12 },
  { faceNumber: BigInt(3), count: BigInt(200), percentage: 20 },
  { faceNumber: BigInt(4), count: BigInt(100), percentage: 10 },
];

const samplePoll: PollPublic = {
  id: "poll-001",
  creator: { toText: () => "user-1" } as any,
  expiresAt: BigInt(Date.now() + 86400000) * BigInt(1000000),
  votes: sampleVotes,
  totalVotes: BigInt(1000),
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  isAnonymous: false,
  photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  faceMarkers: [
    { faceNumber: BigInt(1), xPercent: 20, yPercent: 30 },
    { faceNumber: BigInt(2), xPercent: 45, yPercent: 25 },
    { faceNumber: BigInt(3), xPercent: 68, yPercent: 35 },
    { faceNumber: BigInt(4), xPercent: 82, yPercent: 30 },
  ],
  caption: "Who has the best festival look? VOTE NOW!",
  category: PollCategory.mostHandsome,
};

const samplePollSummaries: PollSummary[] = [
  {
    id: "poll-001",
    leadingFace: BigInt(1),
    expiresAt: BigInt(Date.now() + 86400000) * BigInt(1000000),
    totalVotes: BigInt(3500),
    photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    caption: "Who has the best festival look? VOTE NOW!",
    category: PollCategory.mostHandsome,
  },
  {
    id: "poll-002",
    leadingFace: BigInt(2),
    expiresAt: BigInt(Date.now() + 172800000) * BigInt(1000000),
    totalVotes: BigInt(1200),
    photoUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80",
    caption: "Squad goals — who's got the best smile?",
    category: PollCategory.bestSmile,
  },
];

const sampleProfile: ProfilePublic = {
  id: { toText: () => "user-1" } as any,
  username: "AlexP",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  pollCount: BigInt(5),
};

export const mockBackend: backendInterface = {
  castVote: async (_pollId, _faceNumber) => ({
    __kind__: "ok",
    ok: sampleVotes,
  }),
  createPoll: async (_photoUrl, _faceMarkers, _category, _durationHours, _caption, _isAnonymous) => ({
    __kind__: "ok",
    ok: samplePoll,
  }),
  createProfile: async (_username) => ({
    __kind__: "ok",
    ok: sampleProfile,
  }),
  getMyPolls: async () => samplePollSummaries,
  getMyProfile: async () => sampleProfile,
  getPoll: async (_pollId) => samplePoll,
  getProfile: async (_userId) => sampleProfile,
  getPublicFeed: async (_page) => samplePollSummaries,
  getResults: async (_pollId) => sampleVotes,
  hasVoted: async (_pollId) => false,
};
