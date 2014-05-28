var assert = require('assert');

suite('Friendships', function () {
  test('follow', function(done, server, client) {

    server.eval(function() {
      Friendships.find().observe({
        added: function (obj) {
          emit('added', obj);
        }
      });
    });

    server.once('added', function (obj) {
      assert.equal(obj.friendId, "123");
      assert.equal(obj.userId, this.userId);
      done();
    });

    client.eval(function () {
      Meteor.call('follow', "123");
    });
  });

  test('unfollow', function (done, server, client) {
    server.eval(function () {
      Friendships.find().observe({
        removed: function (obj) {
          emit('removed', obj);
        }
      });
    });

    server.once("removed", function (obj) {
      assert.equal(obj.friendId, "A");
      assert.equal(obj.userId, this.userId);
      done();
    });

    client.eval(function () {
      Meteor.call('follow', "A", function () {
        Meteor.call('unfollow', "A");
      });
    });
  });

  test('isFollowing', function (done, server, client) {
    server.eval(function () {
      Friendships.find().observe({
        added: function (obj) {
          var obj1 = Friendships.isFollowing('123');
          var obj2 = Friendships.isFollowing('321');
          emit("check", obj1, obj2);
        }
      });
    });

    server.once("check", function (obj1, obj2) {
      assert.notEqual(obj1, undefined);
      assert.equal(obj2, undefined);
      done();
    });

    client.eval(function () {
      Meteor.call('follow', "123");
    });
  });

  test('timelineIds', function (done, server, client) {
    server.eval(function () {
      Friendships.find().observe({
        addedAt: function (obj, index, before) {
          if (index == 1) {
            var ids = Friendships.timelineIds(this.userId);
            emit('timelineIds', ids);
          }
        }
      });
    });

    server.once('timelineIds', function (ids) {
      assert.equal(ids.length, 3);
      assert.equal(ids[0], "A");
      assert.equal(ids[1], "B");
      assert.equal(ids[2], this.userId);
      done();
    });

    client.eval(function () {
      Meteor.call('follow', "A", function () {
        Meteor.call('follow', "B");
      });
    });
  });
});
