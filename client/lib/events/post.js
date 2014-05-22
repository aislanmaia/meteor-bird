Template.post.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var textarea = template.find("textarea");
    Posts.insert({message: textarea.value});
    textarea.value = "";
  }
});
