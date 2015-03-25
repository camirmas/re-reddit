Template.userPublic.helpers({
  boards: function() {
    return Boards.find();
  },
  isCurrent: function() {
    return Meteor.user()._id === this._id;
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
    if (Meteor.user()) {
      Meteor.call('followingAddBoard', this._id);
    }
  },
  'click .unfollow-board': function(e) {
    if (Meteor.user()) {
      Meteor.call('followingRemoveBoard', this._id);
    }
  }
});