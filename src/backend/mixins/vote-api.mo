import Time "mo:core/Time";
import PollTypes "../types/poll";
import CommonTypes "../types/common";
import VoteLib "../lib/vote";
import PollLib "../lib/poll";

mixin (
  polls : PollLib.PollMap,
  voterRegistry : VoteLib.VoterRegistry
) {
  public shared ({ caller }) func castVote(
    pollId : CommonTypes.PollId,
    faceNumber : Nat
  ) : async { #ok : [PollTypes.VoteTally]; #err : Text } {
    VoteLib.castVote(polls, voterRegistry, caller, pollId, faceNumber, Time.now());
  };

  public shared query ({ caller }) func hasVoted(
    pollId : CommonTypes.PollId
  ) : async Bool {
    VoteLib.hasVoted(voterRegistry, caller, pollId);
  };

  public query func getResults(
    pollId : CommonTypes.PollId
  ) : async ?[PollTypes.VoteTally] {
    VoteLib.getResults(polls, pollId);
  };
};
