import axios from 'axios';

const urls = require('../../config/urls.json');

interface IData {
    name: string,
    version: string,
    semVerDefinition: string,
    versionDescription: string,
    displayName: string
}

/**
 *
 *
 * @param {string} framework
 * @returns
 */
export const Get = (tag: string) => {

    const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
    }

    return axios.get(urls.data.ApiUrls[tag], axiosConfig)
        .then((response) => {
            
        return response.data;
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
        versionDescription: release.versionDescription,
        displayName: release.displayName
    }

    const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
    }


    axios.put(`${urls.data.ApiUrls[devtooltag]}${devtool}`, data, axiosConfig)
        .then((response: any) => {
            
            return response;
        })
        .catch((error: any) => console.log(error));
}
