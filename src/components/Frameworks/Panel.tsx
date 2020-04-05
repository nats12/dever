import React from 'react';

import { PanelItem } from './PanelItem';

/**
 *
 *
 * @export
 * @returns
 */
export function Panel (props: any) {
    
    
    return(
        
        <div className={props.devtool}>
            { 
                Object.keys(props.data.data).map((index: any) =>
                     <PanelItem key={`${props.devtool}-${index}`} devtool={props.data.data[index]} /> 
                )
            }
        </div>
    )
}