import CommonTypes "common";

module {
  public type Profile = {
    id : CommonTypes.UserId;
    username : Text;
    createdAt : CommonTypes.Timestamp;
    var pollCount : Nat;
  };

  // Shared (immutable) version for public API
  public type ProfilePublic = {
    id : CommonTypes.UserId;
    username : Text;
    createdAt : CommonTypes.Timestamp;
    pollCount : Nat;
  };
};
