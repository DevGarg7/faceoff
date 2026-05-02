import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import PollTypes "../types/poll";
import CommonTypes "../types/common";
import PollLib "poll";

module {
  // Map<PollId, Set<UserId>> — tracks who has voted on each poll
  public type VoterRegistry = Map.Map<CommonTypes.PollId, Set.Set<CommonTypes.UserId>>;

  public func castVote(
    polls : Map.Map<CommonTypes.PollId, PollTypes.Poll>,
    voterRegistry : VoterRegistry,
    caller : CommonTypes.UserId,
    pollId : CommonTypes.PollId,
    faceNumber : Nat,
    now : CommonTypes.Timestamp
  ) : { #ok : [PollTypes.VoteTally]; #err : Text } {
    if (caller.isAnonymous()) return #err "Anonymous caller not allowed";
    if (faceNumber < 1 or faceNumber > 4) return #err "faceNumber must be 1–4";
    switch (polls.get(pollId)) {
      case null return #err "Poll not found";
      case (?poll) {
        if (poll.expiresAt <= now) return #err "Poll has expired";
        // Check duplicate vote
        switch (voterRegistry.get(pollId)) {
          case (?voters) {
            if (voters.contains(caller)) return #err "Already voted on this poll";
            voters.add(caller);
          };
          case null {
            let voters = Set.empty<CommonTypes.UserId>();
            voters.add(caller);
            voterRegistry.add(pollId, voters);
          };
        };
        // Record vote — faceNumber is 1-indexed, already validated 1..4
        let idx = faceNumber - 1 : Nat;
        poll.faceCounts[idx] += 1;
        poll.totalVotes += 1;
        #ok (PollLib.computeTallies(poll));
      };
    };
  };

  public func hasVoted(
    voterRegistry : VoterRegistry,
    caller : CommonTypes.UserId,
    pollId : CommonTypes.PollId
  ) : Bool {
    switch (voterRegistry.get(pollId)) {
      case (?voters) voters.contains(caller);
      case null false;
    };
  };

  public func getResults(
    polls : Map.Map<CommonTypes.PollId, PollTypes.Poll>,
    pollId : CommonTypes.PollId
  ) : ?[PollTypes.VoteTally] {
    switch (polls.get(pollId)) {
      case (?poll) ?PollLib.computeTallies(poll);
      case null null;
    };
  };
};
