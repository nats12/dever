import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import { Update, Get } from '../Services/DatabaseServices/FrameworksService';
import { GetAll as GetAllGitHub } from '../Services/GitHubServices/GitHubService';
import { CompareVersionDesc, FindLatestVersion } from '../Services/VersionComparisons/VersionComparisons';

import { Framework } from './Framework';
import Moment from 'moment';

const urls = require('../config/urls.json');
const authorisation = require('../config/authorization.json');

const tenDaysAgo = new Date();
tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

/**
 *
 *
 * @export
 * @returns
 */
export function FrameworksPanel (props: any) {

    const [latestFrameworks, setLatestFrameworks] = useState<any[]>([{}]);

    const requestOne = axios.get(urls.data.GitHubUrls.react, { headers: { "Authorization": "token " + authorisation.data.GitHubAppToken }});
  
    let previousState: any;


    /**
     *
     *
     */
    useEffect(() => {
        
        Get("react").then(data => {
        setLatestFrameworks([ { 'react': data[0] }]);
        })
        .catch((error: any) => { console.log(error); });

    },
        []
    )


    /**
     *
     *
     */
    useEffect(() => {
    
        // Set global 'previousState' to this state
        previousState = latestFrameworks; 
    
        // Now fetch all releases from Github.
        GetAllGitHub(requestOne).then((responses: any) => {
          
            const regex = /[/](react)[/]/g;
    
            // Match react releases.
            const reactGitHubReleases = responses.map((r: any) => 
                r.data.filter((f: any) => { 
                  return f.zipball_url.match(regex)
                } 
            ));
    
            // Of all react releases, find the latest one
            // Give it an updated_at property with today's date
            const reactLatestRelease = FindLatestVersion(reactGitHubReleases.filter((r: any) => r.length > 0));
            
            reactLatestRelease.updated_at = new Date();
            // Change it's object key name to version to match DB column
            reactLatestRelease.version = reactLatestRelease.name;
            delete reactLatestRelease.name;
        
            // Update only if the new release version is greater than the current one i.e. DB.
            
            if(latestFrameworks[0].react && reactLatestRelease.version > latestFrameworks[0].react.version) {
              setLatestFrameworks([ { 'react': reactLatestRelease }]);
            }
          }).catch((error: any) => { console.log(error); });   
    },
        [latestFrameworks[0]],
    );
    
    
    /**
     *
     *
     */
    useEffect(() => {

        if(latestFrameworks[0].react && previousState[0].react.version < latestFrameworks[0].react.version) { 
            Update('react', latestFrameworks[0].react.version);
        }    
    },
        [latestFrameworks[0].react],
    );

    return(
        
        <div>
            { 
                latestFrameworks.map((framework: any, index: any) =>
                Object.keys(framework).map((key: any) => 
        
                    (Moment(framework[key].updated_at).isAfter(Moment(tenDaysAgo)) ?
                        framework[key].name 
                        ? <Framework name={framework[key].name} release={framework[key]} key={key} /> 
                        : 'Getting framework releases for you...'
                    : '')
                )
                )
            }
        </div>
    )
}