'use strict';

const express = require('express');
const bodyParser = require('body-parser');


var mqtt = require('mqtt')
var fs = require('fs');

var client = mqtt.connect('mqtt://broker.hivemq.com', {username:'himanshu', password:'CunningLearner'});


client.subscribe('apiai/ireading')
client.subscribe('apiai/sreading')

client.on('message', function (topic, message) {
  // message is Buffer 
  if (topic == 'apiai/sreading') {
  var sensoread = message.toString()
  console.log(message.toString())
  fs.writeFile("test", sensoread, function(err) {
    if(err) {
        return console.log(err);
    }
});
}
})

const restService = express();
restService.use(bodyParser.json());

restService.get('/1', function (req, res) {
  //res.send('Hello World')
client.publish('/light/in', 1)
})
restService.get('/0', function (req, res) {
  //res.send('Hello World')
client.publish('/light/in', 0)
})
restService.get('/2', function (req, res) {
  fs.readFile('test','utf8', function(err, contents) {
					console.log("The content of the file"+contents);

		var sread = contents
		res.json({
			data:contents
		})
	})

})


restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
