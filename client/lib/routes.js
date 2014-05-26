Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout',
    onBeforeAction: function () {
      var _id = Meteor.userId();
      this.subscribe('posts', _id);
      this.subscribe('friendship', _id);
    },
    data: function () {
      var _id = Meteor.userId();
      return {
        posts: Posts.find({}),
        followers: Friendships.followers(_id),
        followings: Friendships.followings(_id)
      };
    }
  });

  this.route('user', {
    path: '/user/:_id',
    template: 'user',
    layoutTemplate: 'layout',
    onBeforeAction: function () {
      var _id = this.params._id;
      this.subscribe('posts', _id);
      this.subscribe('friendship', _id);
      this.subscribe('isFollowing', _id);
      this.subscribe('user', _id);
    },
    data: function(){
      var _id = this.params._id;
      var isFollowing = Friendships.isFollowing(_id);
      Session.set('currentUserId', _id);
      Session.set('isFollowing', isFollowing);
      return {
        user: Meteor.users.findOne({_id: _id}),
        posts: Posts.find({}),
        followers: Friendships.followers(_id),
        followings: Friendships.followings(_id)
      };
    }
  });

  this.route('follow', {
    path: '/user/:_id/follow',
    action: function () {
      var _id = this.params._id;
      Friendships.follow(_id);
      console.log("_id: "+ _id);
      this.redirect('/user/' + _id);
    }
  });

  this.route('unfollow', {
    path: '/user/:_id/unfollow',
    action: function () {
      var _id = this.params._id;
      Friendships.unfollow(_id);
      this.redirect('/user/' + _id);
    }
  });
});

