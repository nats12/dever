import React from 'react';

import { PanelItem } from './PanelItem';

/**
 *
 *
 * @export
 * @returns
 */
export function Panel (props: any) {
    
    console.log('PROPS', props);
    return(
        
        <div className={props.devtool}>
            { 
                Object.keys(props.data.data).map((index: any) =>
                     <PanelItem key={`${props.devtool}-${index}`} devtool={props.data.data[index].name} /> 
                )
            }
        </div>
    )
}