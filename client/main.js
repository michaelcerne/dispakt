import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './register.js';
import './main.html';

function targetview() {
  if(Blaze.getView(document.getElementById('root').getElementsByTagName('div')[0]).parentView) {
    return Blaze.getView(document.getElementById('root').getElementsByTagName('div')[0]).parentView
  } else {
    return Blaze.getView(document.getElementById('root').getElementsByTagName('div')[0])
  }
}

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('Peds');
  Meteor.subscribe('Vehicles');
  Meteor.subscribe('userData');
});

Template.body.onRendered(function() {
	if(Session.get('space') === undefined) {
  	Session.set('space', "lookup")
  };
  if(Session.get('search') === undefined) {
  	Session.set('search', "")
  }
});

Template.welcome.onCreated(function() {
  this.errorstate = new ReactiveVar('');
});

Template.welcome.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var usern = document.getElementById('username').value;
    var passw = document.getElementById('password').value;
    var userdata = {
      username: usern,
      password: passw
    };
    Meteor.loginWithPassword(userdata.username, userdata.password, function(error) {
      template.errorstate.set(error)
    });
  }
});

Template.welcome.helpers({
  'error': function() {
    var template = Template.instance();
    if(!template.errorstate.get() == "") {
      return true
    } else {
      return false
    }
  },
  'errorval': function() {
    var template = Template.instance();
    var errortype = template.errorstate.get();
    if(errortype["message"] == "User not found [403]") {
      return "Uh oh! We couldn't quite find you! Are you sure you've got the right username?"
    } else if(errortype["message"] == "Incorrect password [403]") {
      return "Whoops! Somethings up with your password! Make sure it's correct!"
    } else {
      return "Oh no! There's been an issue. Make sure your username and password are correct!"
    };
  }
});

Template.pedlookup.events({
	'submit form': function(event) {
		event.preventDefault();
		let namef = document.getElementById('pednamef').value;
		let namel = document.getElementById('pednamel').value;
		if(namef == "" || namel == "") {
			return
		};
		Session.set('search', {name:{first:namef,last:namel},type:"ped"});
	}
});

Template.vehlookup.events({
	'submit form': function(event) {
		event.preventDefault();
		let lic = document.getElementById('vehname').value;
		Session.set('search', {vin:lic,type:"veh"});
	}
});

Template.results.helpers({
	'results': function() {
		let crit = Session.get('search');
		if(Session.get('search').type === "ped") {
			return Peds.find({name:{first:crit.name.first,last:crit.name.last}})
		} else {
			return Vehicles.find({vin:crit.vin})
		}
  },
  'noresults': function() {
  	let crit = Session.get('search');
  	if(Session.get('search').type === "ped") {
			var t = Peds.findOne({name:{first:crit.name.first,last:crit.name.last}})
		} else {
			var t = Vehicles.findOne({vin:crit.vin})
		};
		if(t === undefined) {
			return true
		} else {
			return false
		}
  },
  'isPed': function() {
  	if(Session.get('search').type === "ped") {
			return true
		} else {
			return false
		}
  }
});

Template.home.helpers({
	'lookupspace': function() {
		if(Session.get('space') === "lookup") {
			return true
		} else {
			return false
		}
	}
});

Template.home.events({
	'click #golookup': function(event) {
		Session.set('space', "lookup")
	},
	'click #goregister': function(event) {
		Session.set('space', "register")
	}
});

Template.lookup.helpers({
	'ready': function() {
		if(Session.get('search') === undefined) {
			return false
		} else {
			return true
		}
	}
});

Template.pedresult.helpers({
	'anyprior': function() {
		var obj = Peds.findOne({_id:this._id});
		var result = true;
		for (var i in obj.priors) {
		    if (obj.priors[i] === true) {
		        result = false;
		        break;
		    }
		}
		if(result) {
			return true
		} else {
			return false
		}
	}
})