Accounts.onCreateUser(function(options, user) {
  service(user.services.facebook, user);
  service(user.services.twitter, user);
  return user;
});

function service (type_service, user) {
  if (type_service) {
    user['profile'] = {
      name: type_service.name
    };
  } else {
    user['profile'] = options.profile;
  }
}
