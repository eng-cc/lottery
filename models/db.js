var mongoose = require('mongoose');
var opts = require('./../settings.js');

mongoose.connect(opts.lomongodb.url);

var userSchema = new mongoose.Schema({
    msg: String,
    used:Boolean,
    time:Number
}, {
    collection: 'woman'
});

var userModel = mongoose.model('user', userSchema);

var user = function(user) {
        this.msg = user.msg || "",
        this.used = user.used || false,
        this.time = user.time || ""
};

user.prototype.save = function(cb){
	var fullUser = {
		msg:this.msg,
		used:this.used,
		time:this.time
	};
	var newUser = new userModel(fullUser);
	newUser.save(function(err,user){
		if (err) {
			return cb(err);
		};
		cb(null,user);
	});
};

user.prototype.query = function(cb){
	userModel.find({used:false},function(err,msgs){
		if (err) {
			return cb(err);
		};
		cb(null ,msgs);
	});
};
user.prototype.update = function(cb){
	userModel.update({time:this.time},{$set:{used:'true'}},{},function(err,msg){
		if (err) {
			return cb(err);
		};
		console.log(msg);
	})
}


/*user.prototype.updateMsg = function(cb){
	var fullUser = {
		name:this.name,
		password:this.password,
		email:this.email,
		msg:this.msg
	};
	userModel.update({name:this.name},fullUser,function(err,user){
		if (err) {
			return cb(err);
		};
		cb(null,user);
	});
};*/

module.exports = user;