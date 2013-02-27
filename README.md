#tinypubsub.js

A miniature pubsub module with buffered callbacks.

##Usage
Initializing the channel
```javascript
var options = {
    'channel' : [1,2,3], //optional, default : []
    'subscribers': 'list of subsciber callbacks'. //optional, default: []
    'subscriberTimeout': 'timeout in milli seconds' //optional, default: 0
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
