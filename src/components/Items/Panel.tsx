import React, { useEffect, useState } from 'react';

import { PanelItem } from './PanelItem';
import { Spinner } from '../Spinner';
import { Get } from '../../Services/DatabaseServices/FrameworksService';

/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
export function Panel (props: any) {
    
    const [databaseData, setDatabaseData] = useState<any>();



    useEffect(() => {
        
        Get(props.description).then(data => {
            
            setDatabaseData([...data]);

        })
        .catch((error: Error) => { console.log(error); });
    },
        [props.description]
    )


    return(
        <div className={props.description}>
            {
                props.data && databaseData ?
                    props.data.map((item: any) => 
                        
                        <PanelItem key={`${props.devtool}-${item.name}`} devtoolname={item.name} devtooltag={props.description} databasedevtool={databaseData.filter((d: any) => d.name === item.name )}/> 
                    )
                : <Spinner />

            }
        </div>
    )
}