import axios from 'axios';

const urls = require('../../config/urls.json');
const authorisation = require('../../config/authorization.json');

/**
 *
 *
 * @param {string} framework
 * @returns
 */
export const GetLatestRelease = (framework: string) => {

    return axios.get(urls.data.GitHubUrls[framework], { headers: { "Authorization": "token " + authorisation.data.GitHubAppToken }})
        .then((response) => {

            return response; 

        }).catch((error: any) => { console.log(error); });   
}