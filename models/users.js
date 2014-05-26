Meteor.methods({
  profileUpdate: function (name, about) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: {
          "profile.name": name,
          "profile.about": about
        }
      }
    );
  }
});
