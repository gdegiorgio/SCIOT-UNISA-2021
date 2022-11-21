
import { config } from '../../../config';
const axios = require('axios')




const mongodb_url = "https://data.mongodb-api.com/app/data-vrsfl/endpoint/data/beta/";
const api_key = config.MONGO_API_KEY
const function_url = config.NUCLIO_UPDATE_FUNC_URL
export function getURLImage(name){
    switch(name){
        case 'banana' : return "https://cdn-icons-png.flaticon.com/512/714/714197.png"
        case 'melon': return "https://cdn-icons-png.flaticon.com/512/2044/2044867.png"
        case 'eggplant' : return "https://cdn-icons-png.flaticon.com/512/766/766026.png"
        case 'red pepper' : return "https://cdn-icons-png.flaticon.com/512/766/766020.png"
        case 'peas' : return "https://cdn-icons-png.flaticon.com/512/433/433677.png"
        case 'tomato' : return "https://cdn-icons-png.flaticon.com/512/184/184540.png"
        case 'pumpkin' : return "https://cdn-icons-png.flaticon.com/512/207/207773.png"
        case 'zuchini' : return "https://cdn-icons-png.flaticon.com/512/1514/1514958.png"
        case 'beans' : return "https://cdn-icons-png.flaticon.com/512/205/205053.png"
        case 'watermelon' : return "https://cdn-icons-png.flaticon.com/512/2934/2934894.png"
    }
}


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


export function daiAcqua(plantID){


    let config ={
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        }
    }

    let body = {plantID:""+plantID}

    axios.post(function_url, body, config).then((response)=>{
        resolve(response.status)
    }).catch((err) =>{console.log(JSON.stringify(err))})

   
}