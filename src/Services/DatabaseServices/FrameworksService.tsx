import axios from 'axios';

const authorisation = require('../../config/authorization.json');
const urls = require('../../config/urls.json');

interface IData {
    name: string,
    version: string,
    semVerDefinition: string,
    versionDescription: string
}

/**
 *
 *
 * @param {string} framework
 * @returns
 */
export const Get = (tag: string) => {

    return axios.get(urls.data.ApiUrls[tag])
        .then((response) => {
            
        return response.data;
          // Fetch currently saved version from DB
        // return response.data.filter((f: any) => f.name === framework);
    
      }).catch((error) => { console.log(error); });

}



/**
 *
 *
 * @param {string} devtool
 * @param {string} version
 */
export const Update = (devtool: string, release: any, devtooltag: string) => {
    
    const data: IData = {
        name: devtool,
        version: release.version,
        semVerDefinition: release.semVerDefinition,
        versionDescription: release.versionDescription
    }

    const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${authorisation.data.Auth0Token}`
        }
    }
    

    axios.put(`${urls.data.ApiUrls[devtooltag]}${devtool}`, data, axiosConfig)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => console.log(error));
}
