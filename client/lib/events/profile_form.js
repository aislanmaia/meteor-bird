Template.profileForm.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var inputs = template.findAll('input');
    var name = inputs[0].value;
    //var about = inputs[1].value;
    var about = template.find('textarea').value;
    Meteor.call('profileUpdate', name, about, function (err) {
      if (err) {
        alert("Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.");
      }
    });
    Session.set("editProfile", false);
  },

  "click #cancelar": function (e, t) {
    e.preventDefault();
    Session.set("editProfile", false);
  }
});
