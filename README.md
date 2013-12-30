#tinypubsub.js

A miniature pubsub module with buffered callbacks.

##Usage
Initializing the channel
```javascript
var options = {
    'channel' : [1,2,3], //optional, default : []
    'subscribers': 'list of subsciber callbacks'. //optional, default: []
    'subscriberTimeout': 'timeout in milli seconds' //optional, default: 0
    'channelThreshold': 2, //channel size threshold, will call all subscibers, default: null
    'isub': false, //sends individual elements to subscribers if set to true, default: false
};

var tps = new tpsChannel(options);
```

Using and updating the channel
```javascript
//adding subscribers
function callback(channel){
    alert(channel);
}
tps.subscribe(callback);

//unsubscribe 
tps.unsubscribe(callback);

//add elements to channel 
tps.push(element);

//update batch elements
tps.push([4,5,6]);
```
##TODO
1. Sync b/w multiple instances via localStorage/globalStorage
