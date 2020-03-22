import axios from 'axios';

const authorisation = require('../../config/authorization.json');
const urls = require('../../config/urls.json');

/**
 *
 *
 * @param {string} framework
 * @returns
 */
export const Get = (framework: string) => {

    return axios.get(urls.data.ApiUrls.frameworks)
        .then((response) => {

          // Fetch currently saved version from DB
        return response.data.filter((f: any) => f.name === framework);
    
      }).catch((error) => { console.log(error); });

}



/**
 *
 *
 * @param {string} framework
 * @param {string} version
 */
export const Update = (framework: string, version: string) => {

    const data = {
        name: [framework],
        version
    }
    
    const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${authorisation.data.Auth0Token}`
        }
    }
    
    axios.put(urls.data.ApiUrls.frameworks, data, axiosConfig)
        .then((response: any) => {
        console.log(response.status)
        })
        .catch((error: any) => console.log(error));
}
