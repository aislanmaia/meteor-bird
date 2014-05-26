Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout',
    data: function () {
      var _id = Meteor.userId();
      var timelineIds = Friendships.timelineIds(_id);
      return {
        posts: Posts.list(timelineIds),
        followers: Friendships.followers(_id),
        followings: Friendships.followings(_id)
      };
    }
  });

  this.route('user', {
    path: '/user/:_id',
    template: 'user',
    layoutTemplate: 'layout',
    data: function(){
      var _id = this.params._id;
      var isFollowing = Friendships.isFollowing(_id);
      var timelineIds = Friendships.timelineIds(_id);
      Session.set('currentUserId', _id);
      Session.set('isFollowing', isFollowing);
      return {
        user: Meteor.users.findOne({_id: _id}),
        posts: Posts.list(timelineIds),
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

