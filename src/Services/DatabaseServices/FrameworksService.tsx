import axios from 'axios';

const authorisation = require('../../config/authorization.json');
const urls = require('../../config/urls.json');

interface IData {
    name: string,
    version: string,
    semVerDefinition: string
}

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
export const Update = (framework: string, version: string, semVerDefinition: string) => {
    
    const data: IData = {
        name: framework,
        version,
        semVerDefinition
    }

    const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${authorisation.data.Auth0Token}`
        }
    }
    
    
    axios.put(`${urls.data.ApiUrls.frameworks}${framework}`, data, axiosConfig)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => console.log(error));
}
