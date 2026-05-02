import Time "mo:core/Time";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";
import ProfileLib "../lib/profile";

mixin (
  profiles : ProfileLib.ProfileMap,
  usernameIndex : ProfileLib.UsernameIndex
) {
  public shared ({ caller }) func createProfile(
    username : Text
  ) : async { #ok : ProfileTypes.ProfilePublic; #err : Text } {
    ProfileLib.createProfile(profiles, usernameIndex, caller, username, Time.now());
  };

  public query func getProfile(
    userId : CommonTypes.UserId
  ) : async ?ProfileTypes.ProfilePublic {
    ProfileLib.getProfile(profiles, userId);
  };

  public shared query ({ caller }) func getMyProfile() : async ?ProfileTypes.ProfilePublic {
    ProfileLib.getProfile(profiles, caller);
  };
};
