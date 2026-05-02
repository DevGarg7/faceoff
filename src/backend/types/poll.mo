import CommonTypes "common";

module {
  public type PollCategory = {
    #mostHandsome;
    #bestStyle;
    #mostPhotogenic;
    #mostAttractive;
    #bestSmile;
    #mostConfident;
    #mostCharming;
  };

  public type FaceMarker = {
    faceNumber : Nat;
    xPercent : Float;
    yPercent : Float;
  };

  public type VoteTally = {
    faceNumber : Nat;
    count : Nat;
    percentage : Float;
  };

  // Internal poll with mutable vote counts
  public type Poll = {
    id : CommonTypes.PollId;
    creator : CommonTypes.UserId;
    photoUrl : Text;
    faceMarkers : [FaceMarker];
    category : PollCategory;
    caption : ?Text;
    isAnonymous : Bool;
    createdAt : CommonTypes.Timestamp;
    expiresAt : CommonTypes.Timestamp;
    var totalVotes : Nat;
    // votes keyed by faceNumber (1..4)
    var faceCounts : [var Nat]; // index 0=face1, 1=face2, 2=face3, 3=face4
  };

  // Shared (immutable) version for public API
  public type PollPublic = {
    id : CommonTypes.PollId;
    creator : CommonTypes.UserId;
    photoUrl : Text;
    faceMarkers : [FaceMarker];
    category : PollCategory;
    caption : ?Text;
    isAnonymous : Bool;
    createdAt : CommonTypes.Timestamp;
    expiresAt : CommonTypes.Timestamp;
    totalVotes : Nat;
    votes : [VoteTally];
  };

  public type PollSummary = {
    id : CommonTypes.PollId;
    photoUrl : Text;
    category : PollCategory;
    caption : ?Text;
    totalVotes : Nat;
    expiresAt : CommonTypes.Timestamp;
    leadingFace : ?Nat;
  };

  public let PAGE_SIZE : Nat = 20;
};
