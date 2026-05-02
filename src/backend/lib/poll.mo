import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import PollTypes "../types/poll";
import CommonTypes "../types/common";

module {
  public type PollMap = Map.Map<CommonTypes.PollId, PollTypes.Poll>;

  let VALID_DURATIONS : [Nat] = [1, 24, 72, 168];
  let NANOS_PER_HOUR : Int = 3_600_000_000_000;

  func isValidDuration(h : Nat) : Bool {
    VALID_DURATIONS.any(func(d : Nat) : Bool { d == h });
  };

  func validateFaceMarkers(markers : [PollTypes.FaceMarker]) : ?Text {
    let n = markers.size();
    if (n < 1 or n > 4) return ?("Must have 1–4 face markers, got " # n.toText());
    for (m in markers.values()) {
      if (m.faceNumber < 1 or m.faceNumber > 4) return ?("faceNumber must be 1–4");
      if (m.xPercent < 0.0 or m.xPercent > 100.0) return ?("xPercent out of range");
      if (m.yPercent < 0.0 or m.yPercent > 100.0) return ?("yPercent out of range");
    };
    null;
  };

  public func createPoll(
    polls : PollMap,
    nextId : Nat,
    caller : CommonTypes.UserId,
    photoUrl : Text,
    faceMarkers : [PollTypes.FaceMarker],
    category : PollTypes.PollCategory,
    durationHours : Nat,
    caption : ?Text,
    isAnonymous : Bool,
    now : CommonTypes.Timestamp
  ) : { #ok : PollTypes.PollPublic; #err : Text } {
    if (caller.isAnonymous()) return #err "Anonymous caller not allowed";
    switch (validateFaceMarkers(faceMarkers)) {
      case (?e) return #err e;
      case null {};
    };
    if (not isValidDuration(durationHours)) return #err "durationHours must be 1, 24, 72, or 168";
    let pollId = nextId.toText();
    let expiresAt = now + Int.fromNat(durationHours) * NANOS_PER_HOUR;
    let poll : PollTypes.Poll = {
      id = pollId;
      creator = caller;
      photoUrl;
      faceMarkers;
      category;
      caption;
      isAnonymous;
      createdAt = now;
      expiresAt;
      var totalVotes = 0;
      var faceCounts = [var 0, 0, 0, 0];
    };
    polls.add(pollId, poll);
    #ok (toPublic(poll));
  };

  public func computeTallies(poll : PollTypes.Poll) : [PollTypes.VoteTally] {
    let total = poll.totalVotes;
    Array.tabulate<PollTypes.VoteTally>(4, func(i) {
      let count = poll.faceCounts[i];
      let pct : Float = if (total == 0) 0.0
        else count.toFloat() / total.toFloat() * 100.0;
      { faceNumber = i + 1; count; percentage = pct };
    });
  };

  public func toPublic(poll : PollTypes.Poll) : PollTypes.PollPublic {
    {
      id = poll.id;
      creator = poll.creator;
      photoUrl = poll.photoUrl;
      faceMarkers = poll.faceMarkers;
      category = poll.category;
      caption = poll.caption;
      isAnonymous = poll.isAnonymous;
      createdAt = poll.createdAt;
      expiresAt = poll.expiresAt;
      totalVotes = poll.totalVotes;
      votes = computeTallies(poll);
    };
  };

  public func toSummary(
    poll : PollTypes.Poll,
    _now : CommonTypes.Timestamp
  ) : PollTypes.PollSummary {
    let leadingFace : ?Nat = if (poll.totalVotes == 0) null else {
      var best = 0;
      var bestIdx = 0;
      for (i in Nat.range(0, 4)) {
        if (poll.faceCounts[i] > best) {
          best := poll.faceCounts[i];
          bestIdx := i;
        };
      };
      ?(bestIdx + 1);
    };
    {
      id = poll.id;
      photoUrl = poll.photoUrl;
      category = poll.category;
      caption = poll.caption;
      totalVotes = poll.totalVotes;
      expiresAt = poll.expiresAt;
      leadingFace;
    };
  };

  public func getPublicFeed(
    polls : PollMap,
    page : Nat,
    now : CommonTypes.Timestamp
  ) : [PollTypes.PollSummary] {
    let activeIter = polls.entries()
      .filter(func((_, p) : (CommonTypes.PollId, PollTypes.Poll)) : Bool {
        p.expiresAt > now
      })
      .map(func((_, p) : (CommonTypes.PollId, PollTypes.Poll)) : PollTypes.Poll { p });
    let active = activeIter.toArray();
    let sorted = active.sort(func(a : PollTypes.Poll, b : PollTypes.Poll) : {
      #less; #equal; #greater
    } {
      Int.compare(b.createdAt, a.createdAt)
    });
    let start = page * PollTypes.PAGE_SIZE;
    if (start >= sorted.size()) return [];
    let end = Nat.min(start + PollTypes.PAGE_SIZE, sorted.size());
    Array.tabulate<PollTypes.PollSummary>(end - start, func(i) {
      toSummary(sorted[start + i], now);
    });
  };

  public func getPollsByCreator(
    polls : PollMap,
    creator : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : [PollTypes.PollSummary] {
    let iter = polls.entries()
      .filter(func((_, p) : (CommonTypes.PollId, PollTypes.Poll)) : Bool {
        Principal.equal(p.creator, creator)
      })
      .map(func((_, p) : (CommonTypes.PollId, PollTypes.Poll)) : PollTypes.PollSummary {
        toSummary(p, now)
      });
    iter.toArray();
  };

  public func getPoll(
    polls : PollMap,
    pollId : CommonTypes.PollId
  ) : ?PollTypes.PollPublic {
    switch (polls.get(pollId)) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };
};
