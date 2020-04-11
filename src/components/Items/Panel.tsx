import React from 'react';

import { PanelItem } from './PanelItem';

/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
export function Panel (props: any) {
    console.log(props);
    return(
        <div className={props.description}>
            {
                props.data ? 
                    props.data.map((item: any) => 
                        <PanelItem key={`${props.devtool}-${item.name}`} devtool={item.name} /> 
                    )
                : `Oops there was an error bringing back info on ${props.description}. Check in later.`

            }
        </div>
    )
}