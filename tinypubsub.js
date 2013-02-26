;window.tpsChannel = function(options) {

	this.options = options;

	this.channel = this.options.channel || [];
	this.subscribers = this.options.subscribers || [];
	this.subscriberTimeout = this.options.subscriberTimeout || 0;

	this.psTimeout = null;
	
	this.init();
};

tpsChannel.prototype = function() {

	init: function() {
		if(this.channel.length>0){
			this.callSubscribers();
		}
	},

	subscribe: function(callback) {
		if( this.subscribers.indexOf(callback) == -1){
			this.subscribers.push(callback);
		}
	},

	unsubscribe: function(callback) {
		this.subscribers.splice(this.subscribers.indexOf('specific'), 1);
	},

	update : function(objs) {
		this.channel = objs;
	},

	push: function(obj) {
		/*
		if(flush==true){
			this._callSubscribers(this.subscribers);
		}*/
		this.channel.push(obj);
		this.callSubscribers();
	},

	callSubscribers : function() {
		if (this.psTimeout!=null){
			clearTimeout(this.psTimeout);
		}
		this.psTimeout = setTimeout(function(){
			this._callSubscribers(this.subscribers);
		}, this.subscriberTimeout);
	}

	_callSubscribers : function(subscribers) {
		var index = subscribers.length;
		while(index--){
			subscribers[index](this.channel);
		}
	},

};