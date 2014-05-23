Template.profileForm.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var inputs = template.findAll('input');
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set:
        {
          "profile.name": inputs[0].value,
          "profile.about": inputs[1].value
        }
      }
    );
    Session.set("editProfile", false);
  },

  "click #cancelar": function (e, t) {
    e.preventDefault();
    Session.set("editProfile", false);
  }
});
