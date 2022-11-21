# Smart Greenhouse Management


# Table of Contents
1. [Abstract](#abstract)
2. [Architecture](#architecture)
3. [How does server works?](#how-does-server-works)
4. [How does client works?](#how-does-client-works)
6. [Installation and run](#installation-and-run)
5. [Future development](#future-development)


## Abstract 

For years, the application of IoT technologies has grown exponentially within industries, so much so that the term IIoT (Industrial Internet Of Things) has been coined.

In particular, one of IIOT's fields of interest is agriculture. The market value of the agricultural sector is estimated to be around $2 billion. In addition, recent studies have attested that in 2050 the world's population will be around 9.5 billion, so additional effort will be needed in the agricultural sector in order to feed that much population. Through the Internet Of Things we can go in and automate those processes so that we can decrease the time in which the crop arrives on people's plates, but most importantly we can carry out continuous remote checks to ensure the quality of the product 

We show how a simple cross-platform mobile application, paired with IoT and serverless computing can facilitate the simple management of plant watering in a greenhouse. 




Services:
- **MongoDB Atlas** NoSQL database on cloud used to store temperatures and plants information
- **Data API** lets you read and write data in MongoDB Atlas with HTTPS requests.

Tools:  
- **Docker** to create, deploy and run applications by using containers  
- **Docker Compose** tool for running multi-container Docker applications.  
- **Nuclio** serverless framework, uses Docker Compose to create, build and deploy serverless functions as Docker containers.  
- **RabbitMQ** message broker    
- **React Native** used to develop a client application that interact with greenhouse and remotely manage it.   
- **Node.js** asynchronous event-driven JavaScript runtime used to simulate sensors, build and execute the client using Expo.
- **Expo** open-source platform for making universal apps for Android, iOS with Javascript and React

Libraries:  
- **MQTT.js** client library for MQTT protocol
- **Axios** a promise-based HTTP Client for node.js.


## Architecture

![Architecture](/assets/images/architecture.png)

## How does server works?



The application is composed by 5 functions:  
- **greenhouseSub**, is triggered by a new MQTT message on the topic `greenhouse/temperature` and send values to DB 'temperature' collection, querying Mongo Data Api. It is deployed on Nuclio. 
- **plantsSub**, is triggered by a new MQTT message on the topic `plants/thirsty` and send values to DB 'plants' collection, querying Mongo Data Api. It is deployed on Nuclio. 
- **plantsPub**, is triggered by client HTTP Request. Update plant status on DB 'plants' collection, querying Mongo Data Api. It is deployed on Nuclio. 
- **temperatureChanged**, launched manually (or via cron) with `node`, sends a new temperature value on `greenhouse/temperature` topic. 
- **plantNeedsWater**, launched manually (or via cron) with `node`, sends the ID of the plant that needs water on  `plants/thirsty` topic. 





## How does client works?

The application manages a single page, "Homepage.js," which handles the rendering of information about the status of the plants and the history of temperature values, as well as showing the current value of the greenhouse temperature. 

To retrieve plants information, an HTTP GET call is used to query the REST API exposed by Mongo DB Atlas :  


```javascript


const mongodb_url = "https://data.mongodb-api.com/app/data-vrsfl/endpoint/data/beta/";
const api_key = config.MONGO_API_KEY

export function getAllPlants(){

    return new Promise(resolve => {

        let data = [];
    
        let url = mongodb_url + "action/find"
    
        let body = {
            'dataSource': 'Cluster0',
            'database': 'greenhouse',
            'collection': 'plants',
            'filter' : {
            },
            "limit": 10
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': api_key
            }
        }
    
        axios.post(url, body, config).then((response) => {
    
           for(const doc of response.data.documents){
               data.push({
                   plantID: doc.plantID,
                   nome : doc.name,
                   da_annaffiare: doc.needs_water,
                   nomeScientifico : doc.sc_name,
                   onUpdate : getAllPlants
               })
           }
           resolve(data)
        })
    })

}
```

Same logic is applied to retrieve temperature values, sorted by Sorted by ascending date : 


```javascript


export function getTempLogs(){

    return new Promise(resolve => {

        let data = [];
    
        let url = mongodb_url + "action/find"
    
        let body = {
            'dataSource': 'Cluster0',
            'database': 'greenhouse',
            'collection': 'temperature',
            'filter' : {
            },
            "sort": { "datetime": -1 },
            "limit": 10
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': api_key
            }
        }
    
        axios.post(url, body, config).then((response) => {
    
           for(const doc of response.data.documents){
               data.push({
                   temperature: doc.temperature,
                   datetime : doc.datetime
               })
           }
           resolve(data)
        })
    })
}


```

Then, when a user want to give water to a plant and click button, update is done by calling a Nuclio function that updates Mongo DB collection : 

```javascript

 return new Promise( (resolve) =>{
        let url = config.NUCLIO_UPDATE_PLANT_FUNCTION
        let body  = {plantID : plantID}
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*'
            }
        }
        axios.post(url, body, config).then((response) => {
            resolve(response.status)
        })
    })

```



## Installation & run


### **Server setup**

Start Nuclio using a docker container:  

```
docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64
```

Browse to http://localhost:8070, create a project, and add the functions.  

Start RabbitMQ using a docker container with MQTT enabled:

```
docker run -p 9000:15672  -p 1883:1883 -p 5672:5672  hansehe/rabbitmq-mqtt 
```

Browse to http://localhost:9000, go in `Queues` section and add following three queues:

```
plants/thirsty
greenhouse/temperature
```


### **Client setup**


Create a DB (free) on Mongo DB Atlas, containing two collections: plants and greenhouse.

Then get an API Key, it will be use later. 


Open the project's directory in a terminal and run the command:

```
npm install
```

This command will install all the modules needed to run the client.

Install [Expo](https://expo.dev/) on your Android or iOS device and follow the instructions to setup the app.


Create a 'config.js' in project root folder and export a JSON config object : 

```javascript
export const config = {
    "MONGO_API_KEY" : ""
    ,"NUCLIO_UPDATE_FUNC_URL" : ""
}
```

and set your project values. 




Then, on terminal, run `expo start` to launch the application and scan the QRcode that appear in the terminal with Expo's app.


(You can also run the app on Android/iOS Emulator by clicking a/i after app launched, following the instruction printed on terminal)

To send values `cd functions/scripts` and then `node temperatureChanged.js` and/or `node plantNeedWater.js` to generate random greenhouse temperature values and/or randomly select a plant that needs to be watered. 



## Future development


In later phases, the system will be able to handle other sensors such as humidity, air pollution, and light exposure sensors. 
Subsequent features will be implemented while maintaining consistency with the current architecture.