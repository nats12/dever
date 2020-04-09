import React, { useState, useEffect, useRef } from 'react';
import Moment from 'moment';

import { Update, Get } from '../../Services/DatabaseServices/FrameworksService';
import { GetLatestRelease } from '../../Services/GitHubServices/GitHubService';
import { Accordion } from '../Accordion';
import { isMajorMinorPatch } from '../../Services/VersionComparisons';

interface IProps {
    devtool: string
    data?: {}
}

/**
 *
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export function PanelItem(props: IProps) {

    // console.log(props);

    type ILatestRelease = {
        updated_at: Date,
        name: string,
        version: string,
        semVerDefinition: string,
        versionDefinition: string
    }


    const [latest, setLatest] = useState<any>({});
    
    /**
     *
     *
     */
    useEffect(() => {
        
        Get(props.devtool).then(data => {
            setLatest((prevState: any) => ({
                prevState: data[0],
                [props.devtool]: data[0]
            }));
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
        
        // Now fetch all releases from Github.
        GetLatestRelease(props.devtool).then((response: any) => {
            
            // Find the latest version out of all releases
            const latestRelease: ILatestRelease = {
                ...response.data,
                'updated_at': new Date(),
                'name': props.devtool,
                'version': response.data.tag_name,
                'versionDescription': response.data.body
            }
            

            // Update only if the new release version is greater than the current one i.e. DB.  
            if(latest[props.devtool] && latestRelease.version > latest[props.devtool].version) {

                latestRelease.semVerDefinition = isMajorMinorPatch(latest.prevState.version, latestRelease.version);

                setLatest((prevState: any) => ({
                    prevState, 
                    [props.devtool]: latestRelease 
                }));
            } 
 
            if(latest.prevState.version < latestRelease.version) {
                Update(props.devtool, latestRelease);
            }
            
        }).catch((error: any) => { console.log(error); });   
    },
        [latest[props.devtool]],
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


    const item = latest[props.devtool];

    return (
        <div> 
            { 
                item 
                ? (isWithinTenDays(item.updated_at)) 
                        ?  <Accordion devtool={item} prev={latest.prevState} /> : ''
                : 'Preparing data for you..'
            }   
        </div>
    )
}