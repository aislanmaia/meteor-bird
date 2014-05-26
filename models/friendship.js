Friendships = new Meteor.Collection('friendships');

Friendships.follow = function (friendId) {
  Meteor.call('follow', friendId, function (err) {
    if (err) {
      alert('Ocorreu um erro ao tentar seguir este usuário. Por favor, tente novamente!');
    }
  });
};

Friendships.unfollow = function (friendId) {
  Meteor.call('unfollow', friendId, function (err) {
    if (err) {
      alert('Ocorreu um erro ao tentar deixar de seguir este usuário. Por favor, tente novamente!');
    }
  });
};

Friendships.isFollowing = function (friendId) {
  return this.findOne({
    userId: Meteor.userId(),
    friendId: friendId
  });
};

// Funções executadas somente no lado servidor
Meteor.methods({
  follow: function (friendId) {
    Friendships.insert({
      userId: Meteor.userId(),
      friendId: friendId
    });
  },

  unfollow: function (friendId) {
    Friendships.remove({
      userId: Meteor.userId(),
      friendId: friendId
    });
  }
});