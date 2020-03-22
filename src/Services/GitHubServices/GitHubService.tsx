import axios, { AxiosResponse } from 'axios';

const authorisation = require('../../config/authorization.json');
const urls = require('../../config/urls.json');

/**
 *
 *
 * @param {string} framework
 * @returns
 */
export const Get = (request: Promise<AxiosResponse<any>>) => {

    return axios.all([request])
        .then(axios.spread((...responses) => {
      
        return responses;
      
    })).catch((error: any) => { console.log(error); });   
}