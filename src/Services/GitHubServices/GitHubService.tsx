import axios from 'axios';

const urls = require('../../config/urls.json');

/**
 *
 *
 * @param {string} devtool
 * @returns
 */
export const GetLatestRelease = (devtool: string) => {

    const gitHubToken = process.env.REACT_APP_GITHUB_TOKEN;

    return axios.get(urls.data.GitHubUrls[devtool], { headers: { "Authorization": "token " + gitHubToken }})
        .then((response) => {
        
            return response; 

        }).catch((error: any) => { console.log(error); });   
}