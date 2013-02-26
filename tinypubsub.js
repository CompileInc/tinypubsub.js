function tpsChannel(options) {

	this.options = options || {};

	this.channel = this.options.channel || [];
	this.subscribers = this.options.subscribers || [];
	this.subscriberTimeout = this.options.subscriberTimeout || 0;

	this.psTimeout = null;

	this.init();
};

tpsChannel.prototype = {

	init: function() {
		if(this.channel.length > 0){
			this.callSubscribers();
		}
	},

	subscribe: function(callback) {
		if( this.subscribers.indexOf(callback) == -1){
			this.subscribers.push(callback);
		}
	},

	unsubscribe: function(callback) {
		this.subscribers.splice(this.subscribers.indexOf(callback), 1);
	},

	update : function(objs) {
		this.channel = objs;
		this.callSubscribers();
	},

	push: function(obj) {
		this.channel.push(obj);
		this.callSubscribers();
	},

	resetChannel: function(){
		this.channel = [];
	},

	callSubscribers : function() {
		if (this.psTimeout != null){
			clearTimeout(this.psTimeout);
		}
		var accessor = this;
		this.psTimeout = setTimeout(function() {
			accessor._callSubscribers(accessor.subscribers);
		}, this.subscriberTimeout);
	},

	_callSubscribers : function(subscribers) {
		var index = subscribers.length;
		while(index--) {
			subscribers[index](this.channel);
		}
		this.resetChannel();
	},

};