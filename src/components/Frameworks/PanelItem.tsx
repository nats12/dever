import React, { useState, useEffect, useRef } from 'react';

import { Update, Get } from '../../Services/DatabaseServices/FrameworksService';
import { GetLatestRelease } from '../../Services/GitHubServices/GitHubService';
import { Accordion } from '../Accordion';

import Moment from 'moment';

const urls = require('../../config/urls.json');
const authorisation = require('../../config/authorization.json');


export function PanelItem(props: any) {


    const [latest, setLatest] = useState<any[]>([{}]);
    const previousLatestTool: React.MutableRefObject<any> = useRef();
    
    /**
     *
     *
     */
    useEffect(() => {
        
        Get(props.devtool).then(data => {
            setLatest([ { [props.devtool]: data[0] }]);
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
        previousLatestTool.current = latest;
    
        // Now fetch all releases from Github.
        GetLatestRelease(props.devtool).then((response: any) => {
     
            // Find the latest version out of all releases
            const latestRelease = {
                
                ...response.data,
                'updated_at': new Date(),
                'name': props.devtool,
                'version': response.data.tag_name
            }
          
            // Update only if the new release version is greater than the current one i.e. DB.  
            if(latest[0][props.devtool] && latestRelease.version > latest[0][props.devtool].version) {
    
              setLatest([ { [props.devtool]: latestRelease }]);
            } 
       
            if(previousLatestTool.current[0][props.devtool].version < latestRelease.version) {
                Update(props.devtool, latestRelease.version);
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


    const item = latest[0][props.devtool];
    
    return (
        <div> 
            { 
                item 
                ? (isWithinTenDays(item.updated_at)) 
                        ?  <Accordion devtool={item} /> : ''
                : ''
            }   
        </div>
    )
}