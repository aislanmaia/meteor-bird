Template.post.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var textarea = template.find("textarea");
    var username = Meteor.user().profile.name;
    Meteor.call('publish', textarea.value, username, function (err) {
      if (err) {
        alert("Ocorreu um erro ao publicar o post. Por favor, tente novamente.");
      }
    });
    textarea.value = "";
    return false;
  }
});
