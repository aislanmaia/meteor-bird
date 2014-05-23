ServiceConfiguration.configurations.remove({});
ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: '333329020125465',
  secret: '6cad6d109a611321d2192578c615818c'
});

ServiceConfiguration.configurations.insert({
  service: 'twitter',
  consumerKey : 'LzDeLhvYMD2GtvSoOdQaeDZ7B',
  secret      : 'a3XlhJTNEJzRoBmUHdVMUVfyo5MHLhGIsvYjyTrrbR1eJQWoC4'
});

//Meteor.startup(function() {

  //Accounts.loginServiceConfiguration.remove({
    //service : 'twitter'
  //});

  //Accounts.loginServiceConfiguration.insert({
    //service     : 'twitter',
    //consumerKey : 'LzDeLhvYMD2GtvSoOdQaeDZ7B',
    //secret      : 'a3XlhJTNEJzRoBmUHdVMUVfyo5MHLhGIsvYjyTrrbR1eJQWoC4'
  //});

//});
