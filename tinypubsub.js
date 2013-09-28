function tpsChannel(options) {

	this.options = options || {};
    
    //channel used for pubsub
	this.channel = this.options.channel || [];

    //channel subscribers
	this.subscribers = this.options.subscribers || [];

    //the minimum window for timeout, default: 0
	this.subscriberTimeout = this.options.subscriberTimeout || 0;

    //Timeout variable used for defferring callbacks
	this.psTimeout = null;

	this.init();
};

tpsChannel.prototype = {

	init: function() {
        //call subscibers on object creation if channel not empty
		if(this.channel.length > 0){
			this.callSubscribers();
		}
	},
    
    //add subscribers
	subscribe: function(callback) {
		if( this.subscribers.indexOf(callback) == -1){
			this.subscribers.push(callback);
		}
	},
    
    //remove subscribers
	unsubscribe: function(callback) {
		this.subscribers.splice(this.subscribers.indexOf(callback), 1);
	},
    
    //overwrite channel (power tool)
	update : function(objs) {
		this.channel = objs;
		this.callSubscribers();
	},

    //adding data to channel
	push: function(obj) {
		this.channel.push(obj);
		this.callSubscribers();
	},

    //reset the channel
	resetChannel: function(){
		this.channel = [];
	},

	callSubscribers : function() {
        //deferring the callback
		if (this.psTimeout != null){
			clearTimeout(this.psTimeout);
		}
		var accessor = this;
		this.psTimeout = setTimeout(function() {
			accessor._callSubscribers(accessor.subscribers);
		}, this.subscriberTimeout);
	},
    
    //Actual call to subscibers
	_callSubscribers : function(subscribers) {
		var index = subscribers.length;
		while(index--) {
			subscribers[index](this.channel);
		}
		this.resetChannel();
	},

};
