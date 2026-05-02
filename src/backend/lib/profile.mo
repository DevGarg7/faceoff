import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Char "mo:core/Char";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";

module {
  public type ProfileMap = Map.Map<CommonTypes.UserId, ProfileTypes.Profile>;
  public type UsernameIndex = Map.Map<Text, CommonTypes.UserId>;

  // Validates: alphanumeric + underscore only, 1–30 chars
  func isValidUsername(u : Text) : Bool {
    let size = u.size();
    if (size == 0 or size > 30) return false;
    for (c in u.toIter()) {
      let ok = c.isAlphabetic() or c.isDigit() or c == '_';
      if (not ok) return false;
    };
    true;
  };

  public func createProfile(
    profiles : ProfileMap,
    usernameIndex : UsernameIndex,
    caller : CommonTypes.UserId,
    username : Text,
    now : CommonTypes.Timestamp
  ) : { #ok : ProfileTypes.ProfilePublic; #err : Text } {
    if (caller.isAnonymous()) return #err "Anonymous caller not allowed";
    if (not isValidUsername(username)) return #err "Username must be 1-30 alphanumeric/underscore characters";
    if (profiles.containsKey(caller)) return #err "Profile already exists";
    if (usernameIndex.containsKey(username)) return #err "Username already taken";
    let profile : ProfileTypes.Profile = {
      id = caller;
      username;
      createdAt = now;
      var pollCount = 0;
    };
    profiles.add(caller, profile);
    usernameIndex.add(username, caller);
    #ok (toPublic(profile));
  };

  public func getProfile(
    profiles : ProfileMap,
    userId : CommonTypes.UserId
  ) : ?ProfileTypes.ProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };

  public func toPublic(profile : ProfileTypes.Profile) : ProfileTypes.ProfilePublic {
    {
      id = profile.id;
      username = profile.username;
      createdAt = profile.createdAt;
      pollCount = profile.pollCount;
    };
  };

  public func incrementPollCount(
    profiles : ProfileMap,
    userId : CommonTypes.UserId
  ) {
    switch (profiles.get(userId)) {
      case (?p) { p.pollCount += 1 };
      case null {};
    };
  };
};
