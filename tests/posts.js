var assert = require('assert');

suite('posts', function () {

  test('inserting and listing', function (done, server, client) {
    server.eval(function () {
      Posts.insert({ "message": "Message 1", "date": new Date(), "userId": "1", "username": "user1" });
      Posts.insert({ "message": "Message 2", "date": new Date(), "userId": "1", "username": "user1" });
      var posts = Posts.find().fetch();
      emit('insert', posts);
    });

    server.once('insert', function (posts) {
      assert.equal(posts.length, 2);
      done();
    });

    client.once('insert', function (posts) {
      assert.equal(Posts.list(posts).count(), 2);
      done();
    });
  });

  test('publish', function (done, server, client) {
    server.eval(function () {
      Posts.find().observe({
        addedAt: function (obj, index, before) {
          if (index > 0) {
            var ids = Friendships.timelineIds(this.userId);
            emit('publishing', ids);
          }
        }
      });
    });

    server.once('publishing', function (ids) {
      assert.equal(Posts.list(posts).count(), 2);
      done();
    });

    client.eval(function () {
      Meteor.call('publish', 'Message 1', 0, function () {
        Meteor.call('publish', 'Message 2', 1);
      });
    });
  });
});
