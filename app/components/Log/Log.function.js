import { config } from '../../../config';

const axios = require('axios')

const mongodb_url = "https://data.mongodb-api.com/app/data-vrsfl/endpoint/data/beta/";
const api_key = config.MONGO_API_KEY

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


export function getLastTempLog(){

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
            "limit": 1
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