import './register.html';

Template.pedreg.events({
	'submit form': function(event) {
		event.preventDefault();
		let namef = document.getElementById('namef').value;
		let namel = document.getElementById('namel').value;
		let dob = document.getElementById('dob').value;
		let wanted = document.getElementById('wanted').checked;
		let pspeeding = document.getElementById('pspeeding').checked;
		let passault = document.getElementById('passault').checked;
		let pdrug = document.getElementById('pdrug').checked;
		let pdui = document.getElementById('pdui').checked;
		let ptheft = document.getElementById('ptheft').checked;
		let parson = document.getElementById('parson').checked;
		let pfraud = document.getElementById('pfraud').checked;
		let dat = {"name":{"first":namef,"last":namel},"dob":dob,"isWanted":wanted,"priors":{"speeding":pspeeding,"assault":passault,"drug":pdrug,"dui":pdui,"theft":ptheft,"arson":parson,"fraud":pfraud}};
		console.log(dat);
		Meteor.call('pedAdd', dat)
	}
})