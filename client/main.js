import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('Peds');
  Meteor.subscribe('Vehicles');
});