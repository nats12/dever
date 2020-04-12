import axios from 'axios';

const urls = require('../../config/urls.json');
const authorisation = require('../../config/authorization.json');

/**
 *
 *
 * @param {string} devtool
 * @returns
 */
export const GetLatestRelease = (devtool: string) => {
    // const capitalized = devtool.charAt(0).toUpperCase() + devtool.slice(1);
    // console.log(capitalized);
    return axios.get(urls.data.GitHubUrls[devtool], { headers: { "Authorization": "token " + authorisation.data.GitHubAppToken }})
        .then((response) => {
        
            return response; 

        }).catch((error: any) => { console.log(error); });   
}