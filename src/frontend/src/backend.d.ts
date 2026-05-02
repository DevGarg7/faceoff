import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface PollPublic {
    id: PollId;
    creator: UserId;
    expiresAt: Timestamp;
    votes: Array<VoteTally>;
    totalVotes: bigint;
    createdAt: Timestamp;
    isAnonymous: boolean;
    photoUrl: string;
    faceMarkers: Array<FaceMarker>;
    caption?: string;
    category: PollCategory;
}
export interface FaceMarker {
    xPercent: number;
    yPercent: number;
    faceNumber: bigint;
}
export interface VoteTally {
    count: bigint;
    faceNumber: bigint;
    percentage: number;
}
export interface PollSummary {
    id: PollId;
    leadingFace?: bigint;
    expiresAt: Timestamp;
    totalVotes: bigint;
    photoUrl: string;
    caption?: string;
    category: PollCategory;
}
export type PollId = string;
export interface ProfilePublic {
    id: UserId;
    username: string;
    createdAt: Timestamp;
    pollCount: bigint;
}
export enum PollCategory {
    mostCharming = "mostCharming",
    mostPhotogenic = "mostPhotogenic",
    bestSmile = "bestSmile",
    bestStyle = "bestStyle",
    mostHandsome = "mostHandsome",
    mostConfident = "mostConfident",
    mostAttractive = "mostAttractive"
}
export interface backendInterface {
    castVote(pollId: PollId, faceNumber: bigint): Promise<{
        __kind__: "ok";
        ok: Array<VoteTally>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createPoll(photoUrl: string, faceMarkers: Array<FaceMarker>, category: PollCategory, durationHours: bigint, caption: string | null, isAnonymous: boolean): Promise<{
        __kind__: "ok";
        ok: PollPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createProfile(username: string): Promise<{
        __kind__: "ok";
        ok: ProfilePublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyPolls(): Promise<Array<PollSummary>>;
    getMyProfile(): Promise<ProfilePublic | null>;
    getPoll(pollId: PollId): Promise<PollPublic | null>;
    getProfile(userId: UserId): Promise<ProfilePublic | null>;
    getPublicFeed(page: bigint): Promise<Array<PollSummary>>;
    getResults(pollId: PollId): Promise<Array<VoteTally> | null>;
    hasVoted(pollId: PollId): Promise<boolean>;
}
