Template.userPublic.helpers({
  boards: function() {
    return Boards.find();
  },
  isCurrent: function() {
    return Meteor.user()._id === this._id;
  },
  followers: function() {
    var followerIds = Followers.findOne({userId: this._id}).users;
    return Meteor.users.find({_id: {$in: followerIds}}).count();
  },
  following: function() {
    var followingIds = Following.findOne({userId: this._id}).users;
    return Meteor.users.find({_id: {$in: followingIds}}).count();
  },
  isFollowing: function() {
    var followerIds = Followers.findOne({userId: this._id}).users;
    return _.contains(followerIds, Meteor.user()._id);
  },
  numBoards: function() {
    return Boards.find().count();
  },
  settings: function() {
    return {
      position: "bottom",
      limit: 10,
      rules: [
        {
          collection: Meteor.users,
          field: 'username',
          matchAll: true,
          template: Template.autocomplete
        }
      ]
    };
  },
  users: function() {
    return Meteor.users.find();
  }
});

Template.userPublic.events({
  'click .follow-user': function(e) {
    var following = Following.findOne({userId: Meteor.user()._id});
    var followers = Followers.findOne({userId: this._id});
    Meteor.call('followUser', following._id, this._id);
    Meteor.call('addFollower', followers._id, Meteor.user()._id);
    $(e.target).remove();
  }
});

Template.userPublic.events({
  'click .follow-board': function(e) {
    var board = Boards.findOne(this._id)
    var user = Meteor.user()._id
    var followers = Followers.findOne({userId: user})
    if (Meteor.user()) {
      Meteor.call('followingAddBoard', this._id);
      Meteor.call('addBoardFollower', followers, board.userId)
    }
  },
  'click .unfollow-board': function(e) {
    if (Meteor.user()) {
      Meteor.call('followingRemoveBoard', this._id);
    }
  }
});
