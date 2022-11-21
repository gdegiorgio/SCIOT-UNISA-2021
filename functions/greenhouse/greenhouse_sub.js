var mqtt = require('mqtt'), url = require('url');
const fs = require('fs');
const axios = require('axios');
var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://guest:guest@172.17.0.3:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;
import { config } from '../../config';
const content = 'Some content!';


const mongodb_url = "https://data.mongodb-api.com/app/data-vrsfl/endpoint/data/beta/action/insertOne"
const api_key = config.MONGO_API_KEY


function bin2string(array) {
  var result = "";
  for (var i = 0; i < array.length; ++i) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

exports.handler = function (context, event) {

var _event = JSON.parse(JSON.stringify(event));
var temperature = bin2string(_event.body.data);
fs.writeFile("/tmp/log.txt", temperature, err2 => {})
        let body = {
            'dataSource': 'Cluster0',
            'database': 'greenhouse',
            'collection': 'temperature',
            "document": {
                "temperature": temperature,
                "datetime" : new Date()
              }
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': api_key
            }
        }

        axios.post(mongodb_url, body, config).then((response) => {
            context.callback('Created new Mongo DB document : ', response)
        })
    };