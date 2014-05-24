Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout',
    data: function () {
      return {
        posts: Posts.list(Meteor.userId())
      };
    }
  });
});
