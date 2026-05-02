import Map "mo:core/Map";
import ProfileLib "lib/profile";
import PollLib "lib/poll";
import VoteLib "lib/vote";
import ProfileApiMixin "mixins/profile-api";
import PollApiMixin "mixins/poll-api";
import VoteApiMixin "mixins/vote-api";

actor {
  // --- Stable state ---
  let profiles : ProfileLib.ProfileMap = Map.empty();
  let usernameIndex : ProfileLib.UsernameIndex = Map.empty();
  let polls : PollLib.PollMap = Map.empty();
  let voterRegistry : VoteLib.VoterRegistry = Map.empty();
  let pollIdRef = { var n = 0 };

  // --- Include mixins ---
  include ProfileApiMixin(profiles, usernameIndex);
  include PollApiMixin(polls, profiles, pollIdRef);
  include VoteApiMixin(polls, voterRegistry);
};
