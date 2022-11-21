var mqtt = require('mqtt'), url = require('url');

var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://guest:guest@localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1],
};

  var client = mqtt.connect(url, options);

  client.on('connect', function () {
    let temperature = Math.floor(Math.random() * (36-28)+28).toString()
      client.publish('greenhouse/temperature', temperature, function () {
        console.log('Measured new temperature : ' + temperature);
        client.end();
      });
  });



