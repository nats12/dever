import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Update, Get } from '../Services/DatabaseServices/FrameworksService';
import { GetReleases } from '../Services/GitHubServices/GitHubService';
import { FindLatestVersion } from '../Services/VersionComparisons/VersionComparisons';

import Moment from 'moment';

const urls = require('../config/urls.json');
const authorisation = require('../config/authorization.json');


export function Framework(props: any) {


    const [latestFrameworks, setLatestFrameworks] = useState<any[]>([{}]);
    const previousLatestFrameworks: React.MutableRefObject<any> = useRef();
    const requestOne = axios.get(urls.data.GitHubUrls[props.framework], { headers: { "Authorization": "token " + authorisation.data.GitHubAppToken }});
    

    /**
     *
     *
     */
    useEffect(() => {
        
        Get(props.framework).then(data => {
            setLatestFrameworks([ { [props.framework]: data[0] }]);
        })
        .catch((error: Error) => { console.log(error); });
    },
        []
    )


    /**
     *
     *
     */
    useEffect(() => {
        
        // Set ref
        previousLatestFrameworks.current = latestFrameworks;
    
        // Now fetch all releases from Github.
        GetReleases(props.framework).then((responses: any) => {
 
            // Find the latest version out of all releases
            const latestRelease = FindLatestVersion(responses.data);
 
            latestRelease.updated_at = new Date();
            // Change it's object key name to version to match DB column
            latestRelease.version = latestRelease.name;
            delete latestRelease.name;

            // Update only if the new release version is greater than the current one i.e. DB.  
            if(latestFrameworks[0][props.framework] && latestRelease.version > latestFrameworks[0][props.framework].version) {
              setLatestFrameworks([ { [props.framework]: latestRelease }]);
            }
        }).then(() => {
            Update(props.framework, latestFrameworks[0][props.framework].version);

        }).catch((error: any) => { console.log(error); });   
    },
        [latestFrameworks[0]],
    );
    
    
    /**
     *
     *
     * @param {Date} date
     * @returns
     */
    const isWithinTenDays = (date: Date) => {
        
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        return Moment(date).isAfter(Moment(tenDaysAgo));
    } 


    const framework = latestFrameworks[0][props.framework];
    
    return (
        <div> 
            { 
                framework 
                ? (isWithinTenDays(framework.updated_at)) 
                        ? <div>NEW {framework.name} UPDATE! Latest found: {framework.version} </div>
                        : ''
                : ''
            }   
        </div>
    )
}