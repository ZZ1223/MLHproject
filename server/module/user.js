var mongoose = require('mongoose');
var Schema = mongoose.Schema;//概要计划
var user={
	username:String,
	password:String,
}
var model = mongoose.model('user',new Schema(user));

module.exports = model;