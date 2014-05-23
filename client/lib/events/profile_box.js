Template.profileBox.events({
  "click button": function (event, template) {
    event.preventDefault();
    Session.set("editProfile", true);
  }
});
