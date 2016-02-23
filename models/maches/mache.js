var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mache = new Schema({
    title: String,
    description: String,
    creator: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Account'},
	visibility: String,
	background_color: String,
	elements: [{
    	type: mongoose.Schema.Types.ObjectId, 
		ref: 'Element'
    }],
    thumbnail: {
    	location: String
    },
    created_on: Date,
  	last_modified: Date
});
//on every save, add the date
Mache.pre('save', function(next){
	//get the current date
	var currentDate = new Date();
	//change the udpated_at field to current date
	this.last_modified = currentDate;

	//if created_on doesn't exist, add to the field
	if(!this.created_on)
		this.created_on = currentDate;

	next();
});
Mache.virtual('popElement').get(function(id){
	Mache
		.findOne({_id: id})
		.populate('elements')
		.exec(function(err,mache){
			if(err) return err;
			return mache;
		});
	
});
module.exports = mongoose.model('Mache', Mache);
