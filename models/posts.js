Posts = new Meteor.Collection('posts');

Posts.list = function (userId) {
  return this.find({userId: userId});
};

Meteor.methods({
  publish: function (message, username) {
    Posts.insert({
      message: message,
      date: new Date(),
      userId: Meteor.userId(),
      username: username
    });
  }
});
