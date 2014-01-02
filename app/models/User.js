

module.exports = {		
		userId : 1000,
		userCt : 0,
		userDB : null,
		schema : null,
		buildSchema : function(){
			var schema = db.Schema({
				username: {type:String,index:1},
				password: String
			});
			schema.statics.findByName = function (username,cb) {
				  return this.find({ username:username},cb);
				};
				
			this.schema = schema;
			this.userDB = db.model('User',this.schema);
		},
		create : function(username,password,cb){
			if(!this.schema){
				this.buildSchema();
			}

			var user = new this.userDB({ username:username,password:password});

			user.save(cb);
		},
		find : function(username,cb){
			if(!this.schema)
				this.buildSchema();

			this.userDB.find({username:username},cb);
		},
		findAll : function(cb){
			if(!this.schema)
				this.buildSchema();

			this.userDB.find({},cb);
		},
		remove : function(id,cb){
			if(!this.schema)
				this.buildSchema();

			this.userDB.remove({_id:id},cb);
		}
};