import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Update, Get } from '../Services/DatabaseServices/FrameworksService';
import { GetLatestRelease } from '../Services/GitHubServices/GitHubService';

import Moment from 'moment';

const urls = require('../config/urls.json');
const authorisation = require('../config/authorization.json');


export function Framework(props: any) {


    const [latest, setLatest] = useState<any[]>([{}]);
    const previousLatestFrameworks: React.MutableRefObject<any> = useRef();
    const requestOne = axios.get(urls.data.GitHubUrls[props.framework], { headers: { "Authorization": "token " + authorisation.data.GitHubAppToken }});

    /**
     *
     *
     */
    useEffect(() => {
        
        Get(props.framework).then(data => {
            setLatest([ { [props.framework]: data[0] }]);
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
        previousLatestFrameworks.current = latest;
    
        // Now fetch all releases from Github.
        GetLatestRelease(props.framework).then((response: any) => {
     
            // Find the latest version out of all releases
            const latestRelease = {
                
                ...response.data,
                'updated_at': new Date(),
                'name': props.framework,
                'version': response.data.tag_name
            }
          
            // Update only if the new release version is greater than the current one i.e. DB.  
            if(latest[0][props.framework] && latestRelease.version > latest[0][props.framework].version) {
    
              setLatest([ { [props.framework]: latestRelease }]);
            } 
       
            if(previousLatestFrameworks.current[0][props.framework].version < latestRelease.version) {
                Update(props.framework, latestRelease.version);
            }
        }).catch((error: any) => { console.log(error); });   
    },
        [latest[0]],
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


    const framework = latest[0][props.framework];
    
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