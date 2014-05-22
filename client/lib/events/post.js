Template.post.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var textarea = template.find("textarea");
    Posts.publish(textarea.value);
    textarea.value = "";
    return false;
  }
});
