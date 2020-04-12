import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import { Update } from '../../Services/DatabaseServices/FrameworksService';
import { GetLatestRelease } from '../../Services/GitHubServices/GitHubService';
import { Accordion } from '../Accordion';
import { isMajorMinorPatch } from '../../Services/VersionComparisons';

import { Spinner } from '../Spinner';

interface IProps {
    devtoolname: string,
    devtooltag: string,
    databasedevtool: [{}]
}


/**
 *
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export function PanelItem(props: IProps) {



    type ILatestRelease = {
        updated_at: Date,
        name: string,
        displayName: string,
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
    
        try {
            setLatest((prevState: any) => ({
                prevState: props.databasedevtool[0],
                [props.devtoolname]: props.databasedevtool[0]
            }));
        } catch(error) {
            console.log(error);
        }
    },
        [props]
    )


    /**
     *
     *
     */
    useEffect(() => {

        // Now fetch all releases from Github.
        GetLatestRelease(props.devtoolname).then((response: any) => {
            
            // Find the latest version out of all releases
            const latestRelease: ILatestRelease = {
                ...response.data,
                'updated_at': new Date(),
                'name': props.devtoolname,
                'displayName': latest[props.devtoolname].displayName,
                'version': response.data.tag_name,
                'versionDescription': response.data.body
            }
            

            // Update only if the new release version is greater than the current one i.e. DB.  
            if(latest[props.devtoolname] && latestRelease.version > latest[props.devtoolname].version) {

                latestRelease.semVerDefinition = isMajorMinorPatch(latest.prevState.version, latestRelease.version);

                setLatest((prevState: any) => ({
                    prevState, 
                    [props.devtoolname]: latestRelease 
                }));
            } 

            if(latest.prevState.version < latestRelease.version) {
                Update(props.devtoolname, latestRelease, props.devtooltag);
            }
            
        }).catch((error: any) => { console.log(error); });   
    },
        [latest, props],
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

    const item = latest[props.devtoolname];

    return (
        <div> 
            { 
                item 
                ? (isWithinTenDays(item.updated_at)) 
                        ?  <Accordion devtool={item} prev={latest.prevState} /> : ''
                : 
                <Spinner />
            }   
        </div>
    )
}