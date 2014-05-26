Posts = new Meteor.Collection('posts');

Posts.list = function (userIds) {
  return this.find({userId: { "$in": userIds }}, {sort: { time: -1, name: 1 }});
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
