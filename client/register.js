import './register.html';

Template.register.helpers({
	'regspace': function() {
		if(Session.get('regspace') === "insert") {
			return true
		} else {
			return false
		}
	},
	'type': function() {
		return Session.get('editing').type
	},
	'typePed': function() {
		if(Session.get('editing').type == "ped") {
			return true
		} else {
			return false
		}
	}
});

Template.register.events({
	'click #goinsert': function(event) {
		Session.set('regspace', "insert")
	},
	'click #goupdate': function(event) {
		Session.set('regspace', "update")
	}
});

Template.pedreg.events({
	'submit form': function(event) {
		event.preventDefault();
		let namef = document.getElementById('namef').value;
		let namel = document.getElementById('namel').value;
		let dob = document.getElementById('dob').value;
		let wanted = document.getElementById('wanted').checked;
		let lstate = document.getElementById('lstate').checked;
		let lair = document.getElementById('lair').checked;
		let lrevoked = document.getElementById('lrevoked').checked;
		let lrevokedair = document.getElementById('lrevokedair').checked;
		let pspeeding = document.getElementById('pspeeding').checked;
		let passault = document.getElementById('passault').checked;
		let pdrug = document.getElementById('pdrug').checked;
		let pdui = document.getElementById('pdui').checked;
		let ptheft = document.getElementById('ptheft').checked;
		let parson = document.getElementById('parson').checked;
		let pfraud = document.getElementById('pfraud').checked;
		let pextra = document.getElementById('pextra').value;
		let pnotes = document.getElementById('pnotes').value;
		let extrafield = false;
		if(pswitch.checked === true) {
			extrafield = true
		};
		let dat = {"name":{"first":namef,"last":namel},"dob":dob,"isWanted":wanted,"notes":pnotes,"license":{"mv":{"owned":lstate,"revoked":lrevoked},"ac":{"owned":lair,"revoked":lrevokedair}},"priors":{"speeding":pspeeding,"assault":passault,"drug":pdrug,"dui":pdui,"theft":ptheft,"arson":parson,"fraud":pfraud,"extra":{"use":extrafield,"value":pextra}}};
		console.log(dat);
		Meteor.call('pedAdd', dat)
	},
	'click #pswitch': function(event) {
		if (document.getElementById('pswitch').checked === true) {
			document.getElementById('pextraf').style.display = "initial"
		} else {
			document.getElementById('pextraf').style.display = "none"
		}
	}
});

Template.vehreg.events({
	'submit form': function(event) {
		event.preventDefault();
		let vplate = document.getElementById('vplate').value;
		let vmodel = document.getElementById('vmodel').value;
		let vyear = document.getElementById('vyear').value;
		let vstolen = document.getElementById('vstolen').checked;
		let vexpired = document.getElementById('vexpired').checked;
		let vrevoked = document.getElementById('vrevoked').checked;
		let vtow = document.getElementById('vtow').checked;
		let vnotes = document.getElementById('vnotes').value;
		let dat = {"plate":vplate,"model":vmodel,"year":vyear,"stolen":vstolen,"expired":vexpired,"revoked":vrevoked,"tow":vtow,"notes":vnotes};
		console.log(dat);
		Meteor.call('vehAdd', dat)
	}
});

Template.pedupdate.helpers({
	'upe': function() {
		return Peds.find({_id:Session.get('editing').id}).fetch()[0]
	}
});

Template.pedupdate.events({
	'submit form': function(event) {
		event.preventDefault();
		let id = Session.get('editing').id;
		let dob = document.getElementById('dob').value;
		let wanted = document.getElementById('wanted').checked;
		let lstate = document.getElementById('lstate').checked;
		let lair = document.getElementById('lair').checked;
		let lrevoked = document.getElementById('lrevoked').checked;
		let lrevokedair = document.getElementById('lrevokedair').checked;
		let pspeeding = document.getElementById('pspeeding').checked;
		let passault = document.getElementById('passault').checked;
		let pdrug = document.getElementById('pdrug').checked;
		let pdui = document.getElementById('pdui').checked;
		let ptheft = document.getElementById('ptheft').checked;
		let parson = document.getElementById('parson').checked;
		let pfraud = document.getElementById('pfraud').checked;
		let pextra = document.getElementById('pextra').value;
		let pnotes = document.getElementById('pnotes').value;
		let extrafield = false;
		if(pswitch.checked === true) {
			extrafield = true
		};
		let dat = {"dob":dob,"isWanted":wanted,"notes":pnotes,"license":{"mv":{"owned":lstate,"revoked":lrevoked},"ac":{"owned":lair,"revoked":lrevokedair}},"priors":{"speeding":pspeeding,"assault":passault,"drug":pdrug,"dui":pdui,"theft":ptheft,"arson":parson,"fraud":pfraud,"extra":{"use":extrafield,"value":pextra}}};
		console.log(dat);
		Meteor.call('pedUpdate', dat, id)
	},
	'click #pswitch': function(event) {
		if (document.getElementById('pswitch').checked === true) {
			document.getElementById('pextraf').style.display = "initial"
		} else {
			document.getElementById('pextraf').style.display = "none"
		}
	},
	'click .delete': function(event) {
		Meteor.call('pedRemove', Session.get('editing').id)
	}
});