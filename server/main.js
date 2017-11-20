import { Meteor } from 'meteor/meteor';

Meteor.publish("Peds", function () {
    return Peds.find();
});

Meteor.publish("Vehicles", function () {
    return Vehicles.find();
});

Meteor.publish("userData", function() {
 return Meteor.users.find({}, {
  fields: {
   'username': 1,
  }
 });
});

Accounts.onCreateUser((options, user) => {
  return user;
});

Meteor.methods({
	'userAdd': function(userdata){
		Accounts.createUser(userdata);
	},
	'pedAdd': function(dat){
		Peds.insert(dat)
	},
	'pedUpdate': function(dat, id){
		Peds.update({_id:id}, { $set: dat });
	},
	'pedRemove': function(id){
		Peds.remove({_id:id})
	},
	'vehAdd': function(dat){
		Vehicles.insert(dat)
	},
})