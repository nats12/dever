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

    interface IDevTool {
        devtoolname: any,
        devtooltag: any
    }

    const [latest, setLatest] = useState<any>({});
    const [devTool, setDevTool] = useState<IDevTool>({ devtoolname: '', devtooltag: '' });

    /**
     *
     *
     */
    useEffect(() => {

        try {
            setLatest({
                prevState: props.databasedevtool[0],
                [props.devtoolname]: props.databasedevtool[0]
            });

            const devToolState: IDevTool = {
                'devtoolname': [props.devtoolname],
                'devtooltag': [props.devtooltag]
            }

            setDevTool(devToolState);

        } catch (error) {
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
        GetLatestRelease(devTool.devtoolname).then((response: any) => {

            // Find the latest version out of all releases
            const latestRelease: ILatestRelease = {
                ...response.data,
                'updated_at': new Date(),
                'name': devTool.devtoolname,
                'displayName': latest[devTool.devtoolname].displayName,
                'version': response.data.tag_name,
                'versionDescription': response.data.body
            }

            if (latestRelease.version.includes("-")) {
                latestRelease.version = latestRelease.version.split("-")[0];
            }
          
            // Update only if the new release version is greater than the current one i.e. DB.  
            if (latest[devTool.devtoolname] && latestRelease.version !== latest[devTool.devtoolname].version) {

                latestRelease.semVerDefinition = isMajorMinorPatch(latest.prevState.version, latestRelease.version);

                setLatest((prevState: any) => ({
                    prevState,
                    [devTool.devtoolname]: latestRelease
                }));
            }

            if (latest.prevState.version !== latestRelease.version) {
                Update(devTool.devtoolname, latestRelease, devTool.devtooltag);
            }

        }).catch((error: any) => { console.log(error); });
    },
        [devTool]
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
                        ? <Accordion devtool={item} prev={latest.prevState} /> : ''
                    :
                    <Spinner />
            }
        </div>
    )
}