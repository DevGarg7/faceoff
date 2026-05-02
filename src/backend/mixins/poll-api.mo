import Time "mo:core/Time";
import PollTypes "../types/poll";
import CommonTypes "../types/common";
import PollLib "../lib/poll";
import ProfileLib "../lib/profile";

mixin (
  polls : PollLib.PollMap,
  profiles : ProfileLib.ProfileMap,
  nextPollId : { var n : Nat }
) {
  public shared ({ caller }) func createPoll(
    photoUrl : Text,
    faceMarkers : [PollTypes.FaceMarker],
    category : PollTypes.PollCategory,
    durationHours : Nat,
    caption : ?Text,
    isAnonymous : Bool
  ) : async { #ok : PollTypes.PollPublic; #err : Text } {
    let result = PollLib.createPoll(
      polls, nextPollId.n, caller, photoUrl, faceMarkers,
      category, durationHours, caption, isAnonymous, Time.now()
    );
    switch (result) {
      case (#ok _) {
        nextPollId.n += 1;
        ProfileLib.incrementPollCount(profiles, caller);
      };
      case (#err _) {};
    };
    result;
  };

  public query func getPublicFeed(page : Nat) : async [PollTypes.PollSummary] {
    PollLib.getPublicFeed(polls, page, Time.now());
  };

  public shared query ({ caller }) func getMyPolls() : async [PollTypes.PollSummary] {
    PollLib.getPollsByCreator(polls, caller, Time.now());
  };

  public query func getPoll(pollId : CommonTypes.PollId) : async ?PollTypes.PollPublic {
    PollLib.getPoll(polls, pollId);
  };
};
